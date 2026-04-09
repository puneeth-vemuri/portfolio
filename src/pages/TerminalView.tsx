import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import * as THREE from "three";
import { portfolioData } from "@/data/portfolio";

function TerminalView() {
  const navigate = useNavigate();
  // Using refs to hold the terminal elements strictly within React's lifecycle cleanup
  const terminalOutputRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminalOutput = terminalOutputRef.current;
    const terminalInput = terminalInputRef.current;
    const container = document.getElementById("card-container");
    const terminalWrap = document.getElementById("terminal");

    if (!terminalOutput || !terminalInput || !container || !terminalWrap) return;

    let scene: any, camera: any, renderer: any, card: any;
    let targetRotationX = 0,
      targetRotationY = 0;
    let animationId: number;

    // ---- FORMATTERS ----
    const formatters = {
      about: () => portfolioData.bio.join("\n\n"),
      projects: () => {
        if (!portfolioData.projects || portfolioData.projects.length === 0)
          return "No projects found.";
        return (
          `Here are some of my projects:\n\n` +
          portfolioData.projects
            .map(
              (p, i) =>
                `${i + 1}. <a href="${p.github}" target="_blank">${p.title
                }</a>\n   ${p.description.replace(/\n/g, "\n   ")}`
            )
            .join("\n\n")
        );
      },
      skills: () => {
        if (!portfolioData.skills) return "No skills found.";
        return (
          "I'm proficient in the following technologies:\n" +
          `\n- Frontend: ${portfolioData.skills.frontend.join(", ")}` +
          `\n- Backend: ${portfolioData.skills.backend.join(", ")}` +
          `\n- Tools: ${portfolioData.skills.tools.join(", ")}`
        );
      },
      experience: () => {
        if (!portfolioData.certificates || portfolioData.certificates.length === 0)
          return "No experience found.";
        return portfolioData.certificates
          .map((e) => `${e.title} | ${e.issuer}\nLink: <a href="${e.link}" target="_blank">View Certificate</a>`)
          .join("\n\n");
      },
      contact: () => {
        return `You can reach me via:\n\n- LinkedIn: <a href="${portfolioData.socials.linkedin}" target="_blank">linkedin.com/in/puneeth-vemuri</a>\n- GitHub: <a href="${portfolioData.socials.github}" target="_blank">github.com/puneeth-vemuri</a>\n- Email: <a href="mailto:${portfolioData.email}" target="_blank">${portfolioData.email}</a>`;
      },
      education: () => "Undergraduate in Computer Science & Engineering",
      certifications: () => "Refer to the experience command.",
      leadership: () => "Self-motivated developer and team player.",
    };

    // ---- COMMANDS ----
    const commands: Record<string, () => string | null> = {
      welcome: () =>
        `Hi, I'm ${portfolioData.name}, a ${portfolioData.role}.\nWelcome to my interactive portfolio terminal!\nType 'help' to see available commands.`,
      help: () =>
        `Available commands:\n  welcome        - Display the welcome message\n  about          - Learn more about me\n  projects       - View my recent projects\n  skills         - See my technical skills\n  experience     - Check out my work experience\n  contact        - Get in touch with me\n  clear          - Clear the terminal screen\n  `,
      about: () => formatters.about(),
      projects: () => formatters.projects(),
      skills: () => formatters.skills(),
      experience: () => formatters.experience(),
      contact: () => formatters.contact(),
      clear: () => {
        const children = Array.from(terminalOutput.children);
        children.forEach((child) => {
          if (!child.classList.contains("mb-4")) child.remove();
        });
        return null;
      },
    };

    let commandHistory: string[] = [];
    let historyIndex = -1;
    let isCommandExecuting = false;
    const commandQueue: string[] = [];

    function typeLine(line: string, speed = 15, callback = () => { }) {
      const outputLine = document.createElement("div");
      outputLine.classList.add("output-line");
      terminalOutput!.appendChild(outputLine);

      if (line.includes("<") && line.includes(">")) {
        outputLine.innerHTML = line;
        terminalOutput!.scrollTop = terminalOutput!.scrollHeight;
        setTimeout(callback, speed * 2);
        return;
      }

      let i = 0;
      function type() {
        if (i < line.length) {
          outputLine.textContent += line.charAt(i);
          i++;
          terminalOutput!.scrollTop = terminalOutput!.scrollHeight;
          setTimeout(type, speed);
        } else {
          callback();
        }
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
        if (commandQueue.length > 0) executeCommand(commandQueue.shift()!);
      };

      if (command.startsWith("_SYSTEM_:")) {
        const message = command.substring(9);
        typeLine(message, 15, onComplete);
        return;
      }

      if (command !== "clear") {
        const output = document.createElement("div");
        output.innerHTML = `<span class="prompt"></span>${command
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}`;
        terminalOutput!.appendChild(output);
      }

      const [baseCommand, ...args] = command.split(" ");
      if (baseCommand in commands) {
        const response = commands[baseCommand]();
        if (response) {
          const lines = response.split("\\n");
          let lineIndex = 0;
          function typeLinesSequentially() {
            if (lineIndex < lines.length) {
              typeLine(lines[lineIndex], 15, () => {
                lineIndex++;
                typeLinesSequentially();
              });
            } else {
              onComplete();
            }
          }
          typeLinesSequentially();
        } else {
          onComplete();
        }
      } else {
        if (command.trim() !== "")
          typeLine(`bash: command not found: ${command}`, 15, onComplete);
        else onComplete();
      }

      if (command.trim() !== "") commandHistory.unshift(command);
      historyIndex = -1;
      terminalOutput!.scrollTop = terminalOutput!.scrollHeight;
    }

    function setupEventListeners() {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          const command = terminalInput!.value.trim().toLowerCase();
          if (command) executeCommand(command);
          terminalInput!.value = "";
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput!.value = commandHistory[historyIndex];
          }
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (historyIndex > 0) {
            historyIndex--;
            terminalInput!.value = commandHistory[historyIndex];
          } else {
            historyIndex = -1;
            terminalInput!.value = "";
          }
        }
      };

      terminalInput!.addEventListener("keydown", onKeyDown);

      const navLinks = document.querySelectorAll(".nav-link");
      const onNavClick = (e: Event) => {
        e.preventDefault();
        const cmd = (e.target as HTMLElement).getAttribute("data-command");
        if (cmd) executeCommand(cmd);
        terminalInput!.focus();
      };
      navLinks.forEach((link) => link.addEventListener("click", onNavClick));

      const onTerminalClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).tagName.toLowerCase() !== "a") terminalInput!.focus();
      };
      terminalWrap!.addEventListener("click", onTerminalClick);

      return () => {
        terminalInput!.removeEventListener("keydown", onKeyDown);
        navLinks.forEach((link) =>
          link.removeEventListener("click", onNavClick)
        );
        terminalWrap!.removeEventListener("click", onTerminalClick);
      };
    }

    // ---- THREE.JS CARD ----
    function init3D() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        container!.clientWidth / container!.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5.5;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container!.clientWidth, container!.clientHeight);
      container!.appendChild(renderer.domElement);

      if ("outputColorSpace" in renderer) {
        // @ts-ignore
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      } else {
        // @ts-ignore
        renderer.outputEncoding = THREE.sRGBEncoding;
      }

      const geometry = new THREE.BoxGeometry(4.5, 7.5, 0.15);

      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 1000;
      const ctx = canvas.getContext("2d")!;
      const texture = new THREE.CanvasTexture(canvas);
      if ("colorSpace" in texture) {
        // @ts-ignore
        texture.colorSpace = THREE.SRGBColorSpace;
      } else {
        // @ts-ignore
        texture.encoding = THREE.sRGBEncoding;
      }

      const profileImage = new Image();
      profileImage.crossOrigin = "Anonymous";

      profileImage.onload = () => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const imgAspect = profileImage.width / profileImage.height;
        const canvasAspect = canvas.width / canvas.height;
        let w = canvas.width;
        let h = canvas.height;
        let x = 0;
        let y = 0;

        if (imgAspect > canvasAspect) {
          h = canvas.width / imgAspect;
          y = (canvas.height - h) / 2;
        } else {
          w = canvas.height * imgAspect;
          x = (canvas.width - w) / 2;
        }

        ctx.drawImage(profileImage, x, y, w, h);
        texture.needsUpdate = true;
      };

      profileImage.onerror = () => {
        ctx.fillStyle = "#161b22";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#c9d1d9";
        ctx.font = "bold 48px Fira Code";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Image Not Found", canvas.width / 2, canvas.height / 2);
        texture.needsUpdate = true;
      };

      profileImage.src = "/src/assets/profile-picture.jpeg";

      const backCanvas = document.createElement("canvas");
      backCanvas.width = 600;
      backCanvas.height = 1000;
      const backCtx = backCanvas.getContext("2d")!;

      const gradient = backCtx.createLinearGradient(
        0,
        0,
        backCanvas.width,
        backCanvas.height
      );
      gradient.addColorStop(0, "#0d1117");
      gradient.addColorStop(1, "#161b22");
      backCtx.fillStyle = gradient;
      backCtx.fillRect(0, 0, backCanvas.width, backCanvas.height);
      backCtx.strokeStyle = "#30363d";
      backCtx.lineWidth = 20;
      backCtx.strokeRect(0, 0, backCanvas.width, backCanvas.height);
      backCtx.fillStyle = "#58a6ff";
      backCtx.font = "bold 200px Fira Code";
      backCtx.textAlign = "center";
      backCtx.textBaseline = "middle";
      backCtx.fillText("PV", backCanvas.width / 2, backCanvas.height / 2);

      const backTexture = new THREE.CanvasTexture(backCanvas);
      if ("colorSpace" in backTexture) {
        // @ts-ignore
        backTexture.colorSpace = THREE.SRGBColorSpace;
      } else {
        // @ts-ignore
        backTexture.encoding = THREE.sRGBEncoding;
      }

      const materials = [
        new THREE.MeshBasicMaterial({ color: 0x161b22 }),
        new THREE.MeshBasicMaterial({ color: 0x161b22 }),
        new THREE.MeshBasicMaterial({ color: 0x161b22 }),
        new THREE.MeshBasicMaterial({ color: 0x161b22 }),
        new THREE.MeshBasicMaterial({ map: texture }),
        new THREE.MeshBasicMaterial({ map: backTexture }),
      ];

      card = new THREE.Mesh(geometry, materials);
      scene.add(card);

      animate();
    }

    function onDocumentMouseMove(event: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      const mouseX =
        ((event.clientX - rect.left) / container!.clientWidth) * 2 - 1;
      const mouseY = -(
        ((event.clientY - rect.top) / container!.clientHeight) * 2 -
        1
      );
      targetRotationY = mouseX * 0.4;
      targetRotationX = mouseY * 0.4;
    }

    function onMouseLeave() {
      targetRotationX = 0;
      targetRotationY = 0;
    }

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (card) {
        card.rotation.y += (targetRotationY - card.rotation.y) * 0.05;
        card.rotation.x += (targetRotationX - card.rotation.x) * 0.05;
      }
      if (renderer && scene && camera) renderer.render(scene, camera);
    }

    function startApp() {
      const removeListeners = setupEventListeners();
      init3D();
      container!.addEventListener("mousemove", onDocumentMouseMove);
      container!.addEventListener("mouseleave", onMouseLeave);

      const onResize = () => {
        if (camera && renderer && container) {
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
      };

      window.addEventListener("resize", onResize);

      // Start with welcome
      executeCommand("welcome");

      return () => {
        if (animationId) cancelAnimationFrame(animationId);
        container?.removeEventListener("mousemove", onDocumentMouseMove);
        container?.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("resize", onResize);
        removeListeners && removeListeners();
        if (renderer && renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    }

    const cleanup = startApp();
    return cleanup;
  }, []);

  return (
    <div className="absolute inset-0 opacity-100 translate-y-0 pointer-events-auto hologram-start transition-all duration-500 overflow-y-auto bg-[#0d1117] text-white">
      <div className="p-4 md:p-8 min-h-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Left: profile card with 3D container */}
          <div className="h-auto lg:h-[calc(100vh-4rem)] lg:sticky lg:top-8">
            <ProfileCard variant="3d" />
          </div>

          {/* Right: terminal + close button */}
          <div className="lg:col-span-2 min-h-[600px] lg:h-[calc(100vh-4rem)] relative">
            <button
              onClick={() => navigate("/")}
              className="absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-sm bg-[#161b22] border border-[#30363d] text-gray-300 hover:text-white hover:bg-black transition cursor-pointer"
            >
              ✕ Close
            </button>

            <div
              id="terminal"
              className="terminal rounded-lg shadow-xl p-3 md:p-4 h-full overflow-y-auto flex flex-col font-mono"
            >
              <div className="flex-grow" id="terminal-output" ref={terminalOutputRef}>
                <div className="mb-4 text-green-400 text-xs md:text-sm">
                  <a href="#" className="nav-link" data-command="help">
                    help
                  </a>{" "}
                  |{" "}
                  <a href="#" className="nav-link" data-command="welcome">
                    welcome
                  </a>{" "}
                  |{" "}
                  <a href="#" className="nav-link" data-command="about">
                    about
                  </a>{" "}
                  |{" "}
                  <a href="#" className="nav-link" data-command="projects">
                    projects
                  </a>{" "}
                  |{" "}
                  <a href="#" className="nav-link" data-command="skills">
                    skills
                  </a>{" "}
                  |{" "}
                  <a href="#" className="nav-link" data-command="experience">
                    experience
                  </a>{" "}
                  |{" "}
                  <a href="#" className="nav-link" data-command="contact">
                    contact
                  </a>{" "}
                  |{" "}
                  <a href="#" className="nav-link" data-command="clear">
                    clear
                  </a>
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
                  spellCheck="false"
                  autoFocus
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
