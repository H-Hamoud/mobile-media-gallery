class ViewController {

    constructor() {
        console.log("<constructor>");
    }

    oncreate(){
        console.log("oncreate(): root is: ", this.root);
    }

    prepareViewSwitching(){
        const toggleBtn = document.getElementById("toggle-view");
        const mainEl = document.querySelector("main");
        let isAnimating = false;

        toggleBtn.onclick = () => {
                if (isAnimating) return;
                isAnimating = true;

                //1: (2s)
                mainEl.style.transition = "opacity 2s";
                mainEl.style.opacity = "0";

                // Listener
                mainEl.addEventListener("transitionend", () => {
                    // change Icon
                    mainEl.classList.toggle("myapp-tiles");
                    toggleBtn.classList.toggle("myapp-img-tiles");
                    toggleBtn.classList.toggle("myapp-img-list");

                    //2: (1s)
                    mainEl.style.transition = "opacity 1s";
                    mainEl.style.opacity = "1";

                    // 1 time
                    mainEl.addEventListener("transitionend", () => {
                        isAnimating = false;
                    }, { once: true });

                }, { once: true });
        };
    }

     loadItems() {
        fetch("data/listitems.json")
            .then(response => response.json())
            .then(items => {
                const ul = document.querySelector("ul");
                ul.innerHTML = "";

                items.forEach(item => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                    <img src="${item.src}">
                    <div class="myapp-li-text">
                        <h2>${item.title}</h2>
                        <p class="myapp-date">${item.added}</p>
                    </div>
                    <button class="myapp-imgbutton myapp-img-edit">Edit</button>
                `;
                    ul.appendChild(li);
                });
            });
    }

    prepareListEvents() {
        const ul = document.querySelector("ul");

        ul.addEventListener("click", (e) => {
            const li = e.target.closest("li");
            if (!li) return;

            const editBtn = e.target.closest(".myapp-img-edit");

            if (editBtn) {
                const title = li.querySelector("h2").textContent;
                const imgUrl = li.querySelector("img").src;

                const confirmed = confirm(`Remove "${title}" ?\nPic-URL: ${imgUrl}`);
                if (confirmed) {
                    li.remove();
                }

            } else {
                const title = li.querySelector("h2").textContent;
                alert(`Titel: ${title}`);
            }
        });
    }

    prepareAddButton() {
        const addBtn = document.querySelector(".myapp-img-add");
        const ul = document.querySelector("ul");

        addBtn.onclick = () => {
            const li = document.createElement("li");
            li.innerHTML = `
            <img src="https://picsum.photos/100/100">
            <div class="myapp-li-text">
                <h2>Neues Medium</h2>
                <p class="myapp-date">${(new Date()).toLocaleDateString()}</p>
            </div>
            <button class="myapp-imgbutton myapp-img-edit">Edit</button>
        `;
            ul.appendChild(li);
        };
    }
}

//calling
window.onload = () => {
    const vc  = new ViewController();
    vc.root = document.body;
    vc.oncreate();
    vc.prepareViewSwitching()
    vc.loadItems();
    vc.prepareListEvents();
    vc.prepareAddButton();

}
