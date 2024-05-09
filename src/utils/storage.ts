export const Local = {
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    get(key: string) {
        let json = localStorage.getItem(key);
        return JSON.parse(json as string);
    },
    remove(key: string) {
        localStorage.removeItem(key)
    },
    clear() {
        localStorage.clear()
    }
}

export const Session = {
    set(key: string, value: string) {
        sessionStorage.setItem(key, JSON.stringify(value))
    },
    get(key: string) {
        let json = sessionStorage.getItem(key)
        JSON.parse(json as string)
    },
    remove(key: string) {
        sessionStorage.removeItem(key)
    },
    clear() {
        sessionStorage.clear()
    }
}

