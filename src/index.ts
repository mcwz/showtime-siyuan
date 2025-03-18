import {
    Setting,
    Plugin
} from "siyuan";
import "./index.scss";

const STORAGE_NAME = "showtime-config";

const defaultData = {
    fontColor: "888888",
    fontSize: '0.8em',
    fontPosition: "-10em"
}

let configData = defaultData;
const style = document.createElement('style');

export default class ShowTime extends Plugin {

    async updateConfigData() {
        configData = await this.loadData(STORAGE_NAME);
        configData.fontColor = configData.fontColor ?? defaultData.fontColor;
        configData.fontSize = configData.fontSize ?? defaultData.fontSize;
        configData.fontPosition = configData.fontPosition ?? defaultData.fontPosition;
    }


    updateStyle() {
        const styleElement = document.getElementById('showtime');
        if (styleElement) {
            document.head.removeChild(styleElement);
        }
        // 定义CSS内容
        const css = `
[data-node-id][data-type='NodeParagraph']::after {
    content: attr(updated);
    display: none;
    color: #${configData.fontColor};
    font-size: ${configData.fontSize};
    position:absolute;
    left:${configData.fontPosition};
    top:0.3em;
}
    [data-node-id][data-type='NodeParagraph']:hover::after {
    display: block;
}`;

        // 将CSS内容设置到<style>元素中
        style.id = 'showtime';
        style.textContent = css;

        // 将<style>元素插入到<head>中
        document.head.appendChild(style);
    }


    async onload() {
        await this.updateConfigData()

        this.eventBus.on("loaded-protyle-static", async (e) => {
            this.updateStyle();
        });

        // 设置字体颜色
        this.setting = new Setting({
            confirmCallback: async () => {
                let saveData = { fontColor: textareaColorElement.value, fontSize: textareaSizeElement.value, fontPosition: textareaPositionElement.value };
                await this.saveData(STORAGE_NAME, saveData);
                await this.updateConfigData()
                this.updateStyle();
            }
        });

        const textareaColorElement = document.createElement("textarea");
        this.setting.addItem({
            title: "颜色",
            direction: "row",
            description: "显示“修改时间”的颜色。",
            createActionElement: () => {
                textareaColorElement.className = "b3-text-field fn__block";
                textareaColorElement.placeholder = defaultData.fontColor;
                textareaColorElement.value = configData.fontColor;
                return textareaColorElement;
            },
        });

        // 设置字体大小
        const textareaSizeElement = document.createElement("textarea");
        this.setting.addItem({
            title: "大小",
            direction: "row",
            description: "显示“修改时间”的大小。",
            createActionElement: () => {
                textareaSizeElement.className = "b3-text-field fn__block";
                textareaSizeElement.placeholder = defaultData.fontSize;
                textareaSizeElement.value = configData.fontSize;
                return textareaSizeElement;
            },
        });


        // 设置时间位置
        const textareaPositionElement = document.createElement("textarea");
        this.setting.addItem({
            title: "位置",
            direction: "row",
            description: "显示“修改时间”的位置。",
            createActionElement: () => {
                textareaPositionElement.className = "b3-text-field fn__block";
                textareaPositionElement.placeholder = defaultData.fontPosition;
                textareaPositionElement.value = configData.fontPosition;
                return textareaPositionElement;
            },
        });
    }
}
