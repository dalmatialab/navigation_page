export interface Service {
    name: string,
    url: string,
    tileColor: {
        "red" : number,
        "green" : number,
        "blue" : number
    },
    fontColor: string,
    iconType: string
}