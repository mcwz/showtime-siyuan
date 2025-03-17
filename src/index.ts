import {
    Setting,
    Plugin
} from "siyuan";
import "./index.scss";

const STORAGE_NAME = "showtime-config";

export default class ShowTime extends Plugin {


    onload() {
        this.data[STORAGE_NAME]={};
        if(!("fontColor" in  this.data[STORAGE_NAME])){
            this.data[STORAGE_NAME].fontColor = "888888";
        }

        this.eventBus.on("loaded-protyle-static", async (e) => {
            // 创建一个<style>元素
            const style = document.createElement('style');

            const fontColor = this.data[STORAGE_NAME].fontColor;
            // 定义CSS内容
            const css = `
                [data-node-id][data-type='NodeParagraph']::after {
                    content: attr(updated);
                    display: none;
                    color: #${fontColor};
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


        const textareaElement = document.createElement("textarea");
        this.setting = new Setting({
            confirmCallback: () => {
                this.saveData(STORAGE_NAME, {fontColor: textareaElement.value});
            }
        });
        this.setting.addItem({
            title: "字体颜色",
            direction: "row",
            description: "显示修改时间的颜色。",
            createActionElement: () => {
                textareaElement.className = "b3-text-field fn__block";
                textareaElement.placeholder = "CCFFCC";
                textareaElement.value = this.data[STORAGE_NAME].fontColor;
                return textareaElement;
            },
        });
    }


    onLayoutReady() {
        this.loadData(STORAGE_NAME);
        // console.log(`frontend: ${getFrontend()}; backend: ${getBackend()}`);
    }

    
}
