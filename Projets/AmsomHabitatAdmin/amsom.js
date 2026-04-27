document.addEventListener("DOMContentLoaded", () => {

    const loginView = document.getElementById("login-view");
    const dashboard = document.getElementById("dashboard");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    
    const projectsBody = document.getElementById("projects-body");
    const resetBtn = document.getElementById("reset-data");
    const logoutBtn = document.getElementById("logout");
    
    const addForm = document.getElementById("add-form");
    const imgFile = document.getElementById("imgFile");
    const preview = document.getElementById("preview");
    
    let imageBase64 = "";
    
    const STORAGE_KEY = "projects-demo";
    
    /* DATA */
    function createDefaultProjects() {
      const items = [];
      for (let i = 1; i <= 40; i++) {
        items.push({
          id: i,
          image: "https://via.placeholder.com/150",
          description: "Projet #" + i,
          preprodUrl: "#",
          prodUrl: "#"
        });
      }
      return items;
    }
    
    const state = {
      projects: JSON.parse(localStorage.getItem(STORAGE_KEY)) || createDefaultProjects()
    };
    
    function save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
    }
    
    /* RENDER */
    function render() {
      projectsBody.innerHTML = "";
    
      state.projects.forEach((p, index) => {
        const tr = document.createElement("tr");
    
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td><img src="${p.image}"></td>
          <td><input class="form-control desc" value="${p.description}"></td>
          <td><input class="form-control pre" value="${p.preprodUrl}"></td>
          <td><input class="form-control prod" value="${p.prodUrl}"></td>
          <td>
            <button class="btn btn-primary save">💾</button>
            <button class="btn btn-danger delete">🗑</button>
          </td>
        `;
    
        tr.querySelector(".save").onclick = () => {
          p.description = tr.querySelector(".desc").value;
          p.preprodUrl = tr.querySelector(".pre").value;
          p.prodUrl = tr.querySelector(".prod").value;
          save();
          render();
        };
    
        tr.querySelector(".delete").onclick = () => {
          state.projects.splice(index, 1);
          save();
          render();
        };
    
        projectsBody.appendChild(tr);
      });
    }
    
    /* LOGIN */
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
    
      const username = document.querySelector("input[name='username']").value;
      const password = document.querySelector("input[name='password']").value;
    
      if (username === "admin" && password === "admin") {
        loginView.style.display = "none";
        dashboard.style.display = "block";
        render();
      } else {
        loginError.textContent = "Identifiants incorrects";
      }
    });
    
    /* IMAGE PREVIEW */
    imgFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
    
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          imageBase64 = reader.result;
          preview.src = imageBase64;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });
    
    /* ADD */
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
    
      state.projects.push({
        id: Date.now(),
        image: imageBase64,
        description: desc.value,
        preprodUrl: preprod.value,
        prodUrl: prod.value
      });
    
      save();
      render();
      addForm.reset();
      preview.style.display = "none";
      imageBase64 = "";
    
      bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
    });
    
    /* RESET */
    resetBtn.onclick = () => {
      state.projects = createDefaultProjects();
      save();
      render();
    };
    
    /* LOGOUT */
    logoutBtn.onclick = () => {
      dashboard.style.display = "none";
      loginView.style.display = "flex";
      loginForm.reset();
    };
    
    });