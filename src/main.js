import "./style.css";
function showModal(p) {
	const modal = document.getElementById("modal");
	const close = document.getElementById("close");
	modal.className = "p"+p;
	modal.showModal();
	close.onclick = ()=>modal.close();
	window.onclick = (e) => {
		if (e.target == modal) {
			modal.close()
		}
	};
}

let player,par,grid;
let gridGet = (i,j) => grid[11*i+j];
	
let xfind = (a) => (par[a] == a ? a : xfind(par[a]));
let union = (a, b) => (par[xfind(a)] = xfind(b));
for (let i = 0; i < 11; i++) {
	const line = document.createElement("div");
	line.style.setProperty("--i", i.toString());
	line.className = "rhombus-line";
	for (let j = 0; j < 11; j++) {
		const hexagon = document.createElement("div");
		hexagon.className = "hexagon";
		hexagon.addEventListener(
			"click",
			(e) => {
				if(gridGet(i,j) != null) return;
				e.target.style.setProperty(
					"background-color",
					player ? "#1e90ff" : "#eb0000"
				);
				grid[11 * i + j] = player;
				if (j == 0 && !player) union(123, 11 * i + j);
				if (j == 10 && !player) union(124, 11 * i + j);
				if (i == 0 && player) union(121, 11 * i + j);
				if (i == 10 && player) union(122, 11 * i + j);
				for (let d of [
					[-1, 0],
					[-1, 1],
					[0, -1],
					[0, 1],
					[1, 0],
					[1, -1],
				]) {
					let ni = i + d[0],
						nj = j + d[1];
					if (
						ni >= 0 &&
						nj >= 0 &&
						ni < 11 &&
						nj < 11 &&
						gridGet((i + d[0]), j + d[1]) === player
					) {
						union(11 * i + j, 11 * (i + d[0]) + j + d[1]);
					}
				}
				if (xfind(121) == xfind(122)) {
					showModal(1);
				} else if (xfind(123) == xfind(124)) {
					showModal(2);
				}
				player = !player;
			}
		);
		line.appendChild(hexagon);
	}
	document.getElementById("board").appendChild(line);
}
function reset(){
	player = true;
	par = Array(11 * 11 + 4)
	.fill(0)
	.map((_, i) => i);
	grid = Array(11 * 11).fill(null);
	for(let elem of document.getElementsByClassName("hexagon")) {
		elem.style.removeProperty("background-color");
	}
}
document.getElementById("reset").addEventListener("click",reset);
reset();
window.a = showModal;