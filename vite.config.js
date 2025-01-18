import { viteSingleFile } from "vite-plugin-singlefile";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { writeFile } from "fs/promises";
import qrcode from "qrcode";

/** @type {import('vite').UserConfig} */
export default {
	plugins: [
		viteSingleFile(),
		ViteMinifyPlugin({
			collapseBooleanAttributes: true,
			removeAttributeQuotes: true,
			removeEmptyAttributes: true,
			removeRedundantAttributes: true,
		}),
		{
			name: "remove-crossorigin-attributes",
			apply: "build",
			order: "post",
			transformIndexHtml(html) {
				return html.replaceAll(/ crossorigin/g, "");
			},
		},
		{
			name: "base64-encode",
			apply: "build",
			order: "post",
			async writeBundle(_, bundle) {
				const datauri =
					"data:text/html;charset=utf-8;base64," +
					Buffer.from(bundle["index.html"].source, "utf-8").toString(
						"base64"
					);
				await writeFile("./dist/datauri.txt", datauri);
				await qrcode.toFile("./dist/qrcode.png", datauri, {
					errorCorrectionLevel: "L",
					version: 40
				});
			},
		},
	],
	build: {
		modulePreload: false,
		cssMinify: "lightningcss",
		minify: "terser",
		terserOptions: {
			module: true,
			compress: {
				passes: 3
			}
		},
	},
};
