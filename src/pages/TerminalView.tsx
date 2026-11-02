import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import * as THREE from "three";
import { portfolioData } from "@/data/portfolio";
import profilePic from "@/assets/profile-picture.jpeg";

function TerminalView() {
  const navigate = useNavigate();
  const terminalOutputRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const terminalOutput = terminalOutputRef.current;
    const terminalInput = terminalInputRef.current;
    const container = document.getElementById("card-container");
    const terminalWrap = document.getElementById("terminal");
    if (!terminalOutput || !terminalInput || !container || !terminalWrap) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    let animationId = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const later = (callback: () => void, delay: number) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    };

    const formatters = {
      about: () => portfolioData.bio.join("\n\n"),
      projects: () => {
        if (!portfolioData.projects.length) return "No projects found.";
        return "Here are some of my projects:\n\n" + portfolioData.projects
          .map((project, index) =>
            `${index + 1}. ${project.title}\n   ${project.description}\n   GitHub: ${project.github}${project.live ? `\n   Live: ${project.live}` : ""}`
          ).join("\n\n");
      },
      skills: () =>
        "I'm proficient in the following technologies:\n" +
        `\n- Frontend: ${portfolioData.skills.frontend.join(", ")}` +
        `\n- Backend: ${portfolioData.skills.backend.join(", ")}` +
        `\n- Tools: ${portfolioData.skills.tools.join(", ")}`,
      experience: () => portfolioData.certificates.length
        ? portfolioData.certificates.map(item =>
            `${item.title} | ${item.issuer}\nCertificate: ${item.link}`
          ).join("\n\n")
        : "No certifications found.",
      contact: () =>
        `You can reach me via:\n\n- LinkedIn: ${portfolioData.socials.linkedin}\n- GitHub: ${portfolioData.socials.github}\n- Email: ${portfolioData.email}`,
    };

    const commands: Record<string, () => string | null> = {
      welcome: () =>
        `Hi, I'm ${portfolioData.name}, a ${portfolioData.role}.\nWelcome to my interactive portfolio terminal!\nType 'help' to see available commands.`,
      help: () =>
        "Available commands:\n  welcome        - Display the welcome message\n  about          - Learn more about me\n  projects       - View my recent projects\n  skills         - See my technical skills\n  experience     - Check out my certifications\n  contact        - Get in touch with me\n  clear          - Clear the terminal screen",
      about: formatters.about,
      projects: formatters.projects,
      skills: formatters.skills,
      experience: formatters.experience,
      contact: formatters.contact,
      clear: () => {
        Array.from(terminalOutput.children).forEach(child => {
          if (!child.classList.contains("mb-4")) child.remove();
        });
        return null;
      },
    };

    const commandHistory: string[] = [];
    let historyIndex = -1;
    let isCommandExecuting = false;
    const commandQueue: string[] = [];

    function typeLine(line: string, speed = 15, callback = () => {}) {
      const outputLine = document.createElement("div");
      outputLine.classList.add("output-line");
      terminalOutput!.appendChild(outputLine);
      // Always render output as text. Portfolio content and command output are
      // never interpreted as HTML, preventing DOM injection in the terminal.
      let index = 0;
      function type() {
        if (index < line.length) {
          outputLine.textContent += line.charAt(index++);
          terminalOutput!.scrollTop = terminalOutput!.scrollHeight;
          later(type, speed);
        } else callback();
      }
      type();
    }

    function executeCommand(command: string) {
      if (isCommandExecuting) {
        commandQueue.push(command);
        return;
      }
      isCommandExecuting = true;
      const onComplete = () => {
        isCommandExecuting = false;
        const next = commandQueue.shift();
        if (next !== undefined) executeCommand(next);
      };

      if (command !== "clear") {
        const output = document.createElement("div");
        const prompt = document.createElement("span");
        prompt.className = "prompt";
        output.appendChild(prompt);
        output.appendChild(document.createTextNode(command));
        terminalOutput!.appendChild(output);
      }

      const [baseCommand] = command.split(" ");
      if (baseCommand in commands) {
        const response = commands[baseCommand]();
        if (response) {
          const lines = response.split("\n");
          let lineIndex = 0;
          const typeLinesSequentially = () => {
            if (lineIndex < lines.length) {
              typeLine(lines[lineIndex++], 15, typeLinesSequentially);
            } else onComplete();
          };
          typeLinesSequentially();
        } else onComplete();
      } else if (command.trim()) {
        typeLine(`bash: command not found: ${command}`, 15, onComplete);
      } else onComplete();

      if (command.trim()) commandHistory.unshift(command);
      historyIndex = -1;
      terminalOutput!.scrollTop = terminalOutput!.scrollHeight;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const command = terminalInput!.value.trim().toLowerCase();
        if (command) executeCommand(command);
        terminalInput!.value = "";
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput!.value = commandHistory[historyIndex];
        }
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput!.value = commandHistory[historyIndex];
        } else {
          historyIndex = -1;
          terminalInput!.value = "";
        }
      }
    };
    terminalInput.addEventListener("keydown", onKeyDown);

    const navLinks = document.querySelectorAll(".nav-link");
    const onNavClick = (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const command = target.closest(".nav-link")?.getAttribute("data-command");
      if (command) executeCommand(command);
      terminalInput!.focus();
    };
    navLinks.forEach(link => link.addEventListener("click", onNavClick));
    const onTerminalClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).tagName.toLowerCase() !== "a") terminalInput!.focus();
    };
    terminalWrap.addEventListener("click", onTerminalClick);

    camera.position.z = 5.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const geometry = new THREE.BoxGeometry(4.5, 7.5, 0.15);
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 1000;
    const context = canvas.getContext("2d");
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    if (context) {
      const profileImage = new Image();
      profileImage.onload = () => {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        const imageAspect = profileImage.width / profileImage.height;
        const canvasAspect = canvas.width / canvas.height;
        const width = imageAspect > canvasAspect ? canvas.width : canvas.height * imageAspect;
        const height = imageAspect > canvasAspect ? canvas.width / imageAspect : canvas.height;
        context.drawImage(profileImage, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
        texture.needsUpdate = true;
      };
      profileImage.onerror = () => {
        context.fillStyle = "#161b22";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#c9d1d9";
        context.font = "bold 48px monospace";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Image Not Found", canvas.width / 2, canvas.height / 2);
        texture.needsUpdate = true;
      };
      profileImage.src = profilePic;
    }

    const backCanvas = document.createElement("canvas");
    backCanvas.width = 600;
    backCanvas.height = 1000;
    const backContext = backCanvas.getContext("2d");
    const gradient = backContext?.createLinearGradient(0, 0, backCanvas.width, backCanvas.height);
    if (backContext && gradient) {
      gradient.addColorStop(0, "#0d1117");
      gradient.addColorStop(1, "#161b22");
      backContext.fillStyle = gradient;
      backContext.fillRect(0, 0, backCanvas.width, backCanvas.height);
      backContext.strokeStyle = "#30363d";
      backContext.lineWidth = 20;
      backContext.strokeRect(0, 0, backCanvas.width, backCanvas.height);
      backContext.fillStyle = "#58a6ff";
      backContext.font = "bold 200px monospace";
      backContext.textAlign = "center";
      backContext.textBaseline = "middle";
      backContext.fillText("PV", backCanvas.width / 2, backCanvas.height / 2);
    }
    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.colorSpace = THREE.SRGBColorSpace;

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x161b22 }),
      new THREE.MeshBasicMaterial({ color: 0x161b22 }),
      new THREE.MeshBasicMaterial({ color: 0x161b22 }),
      new THREE.MeshBasicMaterial({ color: 0x161b22 }),
      new THREE.MeshBasicMaterial({ map: texture }),
      new THREE.MeshBasicMaterial({ map: backTexture }),
    ];
    const card = new THREE.Mesh(geometry, materials);
    scene.add(card);

    let rotationX = 0;
    let rotationY = 0;
    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetRotationY = ((event.clientX - rect.left) / container.clientWidth * 2 - 1) * 0.4;
      targetRotationX = -((event.clientY - rect.top) / container.clientHeight * 2 - 1) * 0.4;
    };
    const onMouseLeave = () => {
      targetRotationX = 0;
      targetRotationY = 0;
    };
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (card) {
        rotationX += (targetRotationX - rotationX) * 0.05;
        rotationY += (targetRotationY - rotationY) * 0.05;
        card.rotation.x = rotationX;
        card.rotation.y = rotationY;
      }
      renderer?.render(scene!, camera!);
    };
    animate();

    const onResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    executeCommand("welcome");

    return () => {
      cancelAnimationFrame(animationId);
      timers.forEach(clearTimeout);
      terminalInput.removeEventListener("keydown", onKeyDown);
      navLinks.forEach(link => link.removeEventListener("click", onNavClick));
      terminalWrap.removeEventListener("click", onTerminalClick);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      geometry.dispose();
      texture.dispose();
      backTexture.dispose();
      materials.forEach(material => material.dispose());
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <div className="absolute inset-0 opacity-100 translate-y-0 pointer-events-auto hologram-start transition-all duration-500 overflow-y-auto bg-[#0d1117] text-white">
      <div className="p-4 md:p-8 min-h-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="h-auto lg:h-[calc(100vh-4rem)] lg:sticky lg:top-8">
            <ProfileCard variant="3d" />
          </div>
          <div className="lg:col-span-2 min-h-[600px] lg:h-[calc(100vh-4rem)] relative">
            <button
              onClick={() => navigate("/")}
              className="absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-sm bg-[#161b22] border border-[#30363d] text-gray-300 hover:text-white hover:bg-black transition cursor-pointer"
            >
              ✕ Close
            </button>
            <div id="terminal" className="terminal rounded-lg shadow-xl p-3 md:p-4 h-full overflow-y-auto flex flex-col font-mono">
              <div className="flex-grow" id="terminal-output" ref={terminalOutputRef}>
                <div className="mb-4 text-green-400 text-xs md:text-sm">
                  {["help", "welcome", "about", "projects", "skills", "experience", "contact", "clear"].map((command, index) => (
                    <span key={command}>
                      {index > 0 ? " | " : ""}
                      <a href="#" className="nav-link" data-command={command}>{command}</a>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center flex-shrink-0">
                <span className="prompt"></span>
                <input
                  type="text"
                  id="terminal-input"
                  ref={terminalInputRef}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Terminal command input"
                  className="bg-transparent border-none outline-none text-[#c9d1d9] w-full text-sm md:text-base font-mono"
                />
                <span className="cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminalView;
