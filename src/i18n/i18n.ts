import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: {
            label: {},
            error: {},
            message: {},
            text: {
                hello: "hello",
                title: "Layput & Style",
                MoveShape:"Move Shape",
                MovePosition:"Move Position",
            },
            content: {}
        }
    },
    th: {
        translation: {
            label: {},
            error: {},
            message: {},
            text: {
                hello: "สวัสดี",
                title: "การจัดการหน้าเว็บ",
                MoveShape:"เลื่อนรูปแบบ",
                MovePosition:"เปลี่ยนตำแหน่ง",
            },
            content: {}
        }
    }
};

i18n.use(initReactI18next).init({
    resources,

    lng: "en",

    interpolation: {
        escapeValue: false
    }
});

export default i18n;
