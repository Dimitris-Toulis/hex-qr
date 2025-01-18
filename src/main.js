import "./style.css";
let getColor = (p) => (p ? "#1e90ff" : "#eb0000");
let showModal = (p) => {
	let modal = document.querySelector("#m");
	let t = document.querySelector("p");
	t.innerText = `Player ${p + 1} has won!`;
	t.style.color = getColor(!p);
	modal.style.setProperty("--s", getColor(p));
	modal.style.setProperty("--m", getColor(!p));
	modal.showModal();
	let close = () => {
		modal.close();
		reset();
	};
	document.querySelector("#c").onclick = close;
	window.onclick = (e) => e.target == modal && close();
};

let player, par, grid;

let xfind = (a) => (par[a] == a ? a : (par[a] = xfind(par[a])));
let union = (a, b) => (par[xfind(a)] = xfind(b));
for (let i = 0; i < 11; i++) {
	let line = document.createElement("div");
	line.style.cssText = "--i:" + i;
	line.className = "l";
	for (let j = 0; j < 11; j++) {
		let hexagon = document.createElement("div");
		hexagon.className = "h";
		let id = 11 * i + j;
		hexagon.onclick = () => {
			if (grid[id] != undefined) return;
			hexagon.style.cssText = "background:" + getColor(player);
			grid[id] = player;
			if (j == 0 && !player) union(121, id);
			if (j == 10 && !player) union(122, id);
			if (i == 0 && player) union(123, id);
			if (i == 10 && player) union(124, id);
			for (let [a, b] of [
				[-1, 0],
				[-1, 1],
				[0, -1],
				[0, 1],
				[1, 0],
				[1, -1],
			]) {
				let ni = i + a,
					nj = j + b;
				let n = 11 * ni + nj;
				if (ni >= 0 && nj >= 0 && ni < 11 && nj < 11 && grid[n] === player) {
					union(id, n);
				}
			}
			if (xfind(121) == xfind(122)) {
				showModal(1);
			} else if (xfind(123) == xfind(124)) {
				showModal(0);
			}
			player = 1 - player;
		};
		line.appendChild(hexagon);
	}
	document.body.appendChild(line);
}
function reset() {
	player = 1;
	par = Array(125)
		.fill(0)
		.map((_, i) => i);
	grid = Array(121);
	for (let elem of document.querySelectorAll(".h")) {
		elem.style.cssText = "";
	}
}
reset();
