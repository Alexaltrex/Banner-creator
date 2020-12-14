export type LangType = 'eng' | 'rus'
export type SizeType = {
    width: number | null
    height: number | null
}

export enum MainSidebarItemEnum {
    background = 0,
    text = 1,
}

export type BackgroundStyleType = 'color' | 'gradient' | 'texture' | 'image'

export enum BackgroundTabIndexEnum {
    color = 0,
    gradient = 1,
    image = 2
}

export type BackgroundStyleColorType = {
    color: string
}
export type GradientStyleType = 'horizontal' | 'vertical' | 'radial'
export type ScaleModeType = 'Exact fit' | 'Scale crop' | 'No scale' | 'Maintain aspect'
export type AlignType = 'left-top' | 'center-top' | 'right-top' |
    'left-center' | 'center' | 'right-center' |
    'left-bottom' | 'center-bottom' | 'right-bottom'

export enum ImageTabIndexEnum {
    myImage = 0,
    imageSetting = 1
}

export type ImageType = {
    id: number
    src: string
    name: string
}
export type ImageItemType = {
    src: string
    name: string
}
export type ZoomType = 10 | 25 | 50 | 75 | 100 | 150 | 200 | 300 | 400
export type DownloadCaseType = 'PNG' | 'JPEG' | 'HTML'
export type elementType = 'header' | 'subheader' | 'body'
export type TextType = {
    id: number
    content: string
    position: {
        top: number
        left: number
    }
    fontSize: number
    fontStyle: 'normal' | 'italic'
    fontFamily: string
    color: string
    lowerCase: boolean
    upperCase: boolean
    hover: boolean
    selected: boolean
    editParameters: boolean
    editText: boolean

}