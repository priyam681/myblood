
let items = document.querySelector(".header__inline-menu").querySelectorAll("details");

items.forEach(item => {
  let timeout;

  item.addEventListener("mouseover", () => {
    clearTimeout(timeout); // Pehle se koi timeout ho to hatao
    item.setAttribute("open", true);
  });

  item.addEventListener("mouseleave", () => {
    timeout = setTimeout(() => {
      item.removeAttribute("open");
    }, 300); // 300ms ka delay
  });

  item.querySelector("ul").addEventListener("mouseover", () => {
    clearTimeout(timeout); // Megamenu pe cursor aane par timeout hatao
  });

  item.querySelector("ul").addEventListener("mouseleave", () => {
    timeout = setTimeout(() => {
      item.removeAttribute("open");
    }, 300);
  });
});

