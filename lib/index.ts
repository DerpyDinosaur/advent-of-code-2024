export const load_data = async (path: string, mode:string="line") => {
    const file = Bun.file(path);
    const content = await file.text();

    let data = content;
    if(mode === "line"){
        data = data.split("\n").map(
            x => x.replace(/\r/, '')
        );
    }

    return data
}