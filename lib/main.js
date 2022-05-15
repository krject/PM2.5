const vm_head = Vue.createApp({
    data() {
        return {
            titleAry: ['首頁', '登入'],
            linkAry: ['index.html', 'login.html']
        }
    }
});
vm_head.mount('#head');

const vm_content = Vue.createApp({
    data() {
        return {
            nowTime: "Loading...",
            timer: null,
            AQ: 20,
            qualtity: "良好",
            place: "高雄第一科大+創夢工廠",
            future: 0,
            currentText: "當前空氣"
        }
    },
    methods: {
        showTime: function () {
            this.timer = setInterval(() => {
                const now = new Date();
                const today = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
                const hour = (now.getHours() < 10 ? `0${now.getHours()}` : now.getHours());
                const minute = (now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes());
                const second = (now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds());
                this.nowTime = `${today} ${hour}:${minute}:${second}`;
            }, 1000);
        },
        search: function () {
            let textBox = document.getElementById('placeText');
            this.place = textBox.value;
            this.future = 0;
            this.checkFuture();
            this.changeAQ();
        },
        changeAQ: function () {
            let number = Math.floor(Math.random() * 500);
            this.AQ = number;
            this.changeAQText();
        },
        changeAQText: function () {
            let number = this.AQ;
            if (number > 0 && number < 51) {
                this.qualtity = "良好";
            } else if (number > 50 && number < 101) {
                this.qualtity = "普通";
            } else if (number > 100 && number < 200) {
                this.qualtity = "不良";
            } else if (number > 199 && number < 300) {
                this.qualtity = "非常不良";
            } else {
                this.qualtity = "有害";
            }
        },
        addFuture: function () {
            this.future += 1;
            this.checkFuture();
        },
        subFuture: function () {
            this.future -= 1;
            this.checkFuture();
        },
        checkFuture: function () {
            let num = 0;
            if (this.future == 0) {
                this.currentText = "當前空氣";
            } else if (this.future > 0) {
                this.currentText = `預計${this.future}小時後`;
                num = Math.floor(Math.random() * 20) + 1;
            } else {
                this.currentText = `${Math.abs(this.future)}小時前`;
                num = Math.floor(Math.random() * (this.AQ - 5) + 1) * -1;
            }
            console.log(this.AQ);
            console.log(num);
            this.AQ += num;
            this.changeAQText();
        },
        login: function () {
            location.href = "./index.html";
        }
    },
    mounted() {
        this.showTime();
    }
});
vm_content.mount("#content");