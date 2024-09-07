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
                buttonBack:"Back Home",
                mname:"Prefix",
                name:"Name",
                lname:"Last Name",
                gender:"Gender",
                phone:"Phone Number",
                nationality:"Nationality",
                birthday:"Birthday",
                salary:"Salary",
                manage:"Manage",
                passport:"Passport",
                edit:"edit",
                delete:"delate",
                delateAll:"delate",
                all:"select all",
                clr:"Clear",
                save:"Save",
                idCard:"ID Card",
                female:"female",
                male:"male",
                notgender:"not gender",
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
                buttonBack:"หน้าหลัก",
                mname:"คำนำหน้า",
                name:"ชื่อจริง",
                lnaame:"นามสกุล",
                gender:"เพศ",
                phone:"หมายเลขโทรศัพท์",
                nationality:"สัญชาติ",
                birthday:"วันเกิด",
                salary:"เงินเดือน",
                manage:"จัดการ",
                passport:"หนังสือเดินทาง",
                edit:"แก้ไข",
                delete:"ลบ",
                delateAll:"ลบข้อมูล",
                all:"เลือกทั้งหมด",
                clr:"ล้างข้อมูล",
                save:"ส่งข้อมูล",
                idCard:"เลขบัตรประชาชน",
                female:"หญิง",
                male:"ชาย",
                nogender:"ไม่ระบุ",

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
