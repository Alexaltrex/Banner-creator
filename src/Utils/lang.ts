import {LangType} from "../Types/types";
import Button from "@material-ui/core/Button";
import React from "react";
import {Typography} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";


export const Lang: LangObjectType = {
    'English': {
        'eng': 'English',
        'rus': 'Русский'
    },
    'Change language': {
        'eng': 'Change language',
        'rus': 'Сменить язык'
    },
    'Banner creator': {
        'eng': 'Banner creator',
        'rus': 'Редактор баннеров'
    },
    'Create new': {
        'eng': 'Create new',
        'rus': 'Создать новый'
    },
    'Width': {
        'eng': 'Width',
        'rus': 'Ширина'
    },
    'Height': {
        'eng': 'Height',
        'rus': 'Высота'
    },
    'Create': {
        'eng': 'Create',
        'rus': 'Создать'
    },
    'Custom Size': {
        'eng': 'Custom Size',
        'rus': 'Задать размер'
    },
    'Background': {
        'eng': 'Background',
        'rus': 'Задний фон'
    },
    'Text': {
        'eng': 'Text',
        'rus': 'Текст'
    },
    'Color': {
        'eng': 'Color',
        'rus': 'Цвет'
    },
    'Gradient': {
        'eng': 'Gradient',
        'rus': 'Градиент'
    },
    'Texture': {
        'eng': 'Texture',
        'rus': 'Текстура'
    },
    'Image': {
        'eng': 'Image',
        'rus': 'Картинка'
    },
    'Default presets': {
        'eng': 'Default presets',
        'rus': 'Стандартные цвета'
    },
    'Border': {
        'eng': 'Border',
        'rus': 'Рамка'
    },
    'Use border': {
        'eng': 'Use border',
        'rus': 'С рамкой'
    },
    'Select color': {
        'eng': 'Select color',
        'rus': 'Выберите цвет'
    },
    'Select background color': {
        'eng': 'Select background color',
        'rus': 'Выберите цвет заднего фона'
    },
    'Select border color': {
        'eng': 'Select border color',
        'rus': 'Выберите цвет рамки'
    },
    'Select start color': {
        'eng': 'Select start color',
        'rus': 'Выберите начальный цвет'
    },
    'Select end color': {
        'eng': 'Select end color',
        'rus': 'Выберите конечный цвет'
    },
    'My images': {
        'eng': 'My images',
        'rus': 'Мои'
    },
    'Stock photos': {
        'eng': 'Stock photos',
        'rus': 'Стоковые'
    },
    'Settings': {
        'eng': 'Settings',
        'rus': 'Настройки'
    },
    'Scale mode': {
        'eng': 'Scale mode',
        'rus': 'Масштабирование'
    },
    'Align': {
        'eng': 'Align',
        'rus': 'Выравнивание'
    },
    'Exact fit': {
        'eng': 'Exact fit',
        'rus': 'Непропорционально вписать'
    },
    'Scale crop': {
        'eng': 'Scale crop',
        'rus': 'Пропорционально заполнить'
    },
    'No scale': {
        'eng': 'No scale',
        'rus': 'Заполнить без масштабирования'
    },
    'Maintain aspect': {
        'eng': 'Maintain aspect',
        'rus': 'Пропорционально вписать'
    },
    'Download': {
        'eng': 'Download',
        'rus': 'Скачать'
    },
    'Add text': {
        'eng': 'Add text',
        'rus': 'Добавить текст'
    },
    'Add header': {
        'eng': 'Add header',
        'rus': 'Заголовок'
    },
    'Add subheader': {
        'eng': 'Add subheader',
        'rus': 'Подзаголовок'
    },
    'Add body text': {
        'eng': 'Add body text',
        'rus': 'Обычный текст'
    },
    'Font size (px)': {
        'eng': 'Font size (px)',
        'rus': 'Размер шрифта (пикс)'
    },
    'Delete': {
        'eng': 'Delete',
        'rus': 'Удалить'
    },
    'Download created banner as': {
        'eng': 'Download created banner as',
        'rus': 'Загрузить созданный баннер как'
    },
    'Enter a file name:': {
        'eng': 'Enter a file name:',
        'rus': 'Введите имя файла:'
    },
    'Enter a link:': {
        'eng': 'Enter a link:',
        'rus': 'Введите ссылку:'
    },
    'Cancel': {
        'eng': 'Cancel',
        'rus': 'Закрыть'
    },
    'Copy': {
        'eng': 'Copy',
        'rus': 'Копировать'
    },
    'Quality of jpeg': {
        'eng': 'Quality of jpeg',
        'rus': 'Качество jpeg'
    },
    'Maximum count of text': {
        'eng': 'Maximum count of text',
        'rus': 'Максимальное количество строк'
    },
    'Maximum count of text in trial version of banner creator is 3.': {
        'eng': 'Maximum count of text in trial version of banner creator is 3.',
        'rus': 'Максимальное количество строк в ознакомительной версии программы равно 3.'
    },
};

// const lang = useSelector(getLang);
// translate(lang, '')

export const translate = (lang: LangType, phrase: string): string => {
    return lang === 'rus' ? Lang[phrase].rus : Lang[phrase].eng
};

type LangObjectType = {
    [key: string]: {
        'eng': string
        'rus': string
    }
}

