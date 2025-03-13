import {
    Plugin
} from "siyuan";
import "./index.scss";

export default class ShowTime extends Plugin {


    onload() {
        this.eventBus.on("loaded-protyle-static", async (e) => {
            // 创建一个<style>元素
            const style = document.createElement('style');

            // 定义CSS内容
            const css = `
                [data-node-id][data-type='NodeParagraph']::after {
                    content: attr(updated);
                    display: none;
                    color: #888;
                    font-size: 0.8em;
                    position:absolute;
                    left:-10em;
                    top:0.3em;
                }
                    [data-node-id][data-type='NodeParagraph']:hover::after {
                    display: block;
                }`;

            // 将CSS内容设置到<style>元素中
            style.textContent = css;

            // 将<style>元素插入到<head>中
            document.head.appendChild(style);
        });
    }
}
