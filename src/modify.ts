import fs from "fs-extra"
import path from "path"
import handlebar from "handlebars"

export interface IInput {
    name: string;
    description: string;
    author: string;
}

export const modifyPackageJson = function (downloadPath: string, options: IInput) {
    const packagePath = path.join(downloadPath, "package.json")
    if (!fs.existsSync(packagePath)) throw new Error("no package.json file")

    const content = fs.readFileSync(packagePath).toString()
    const template = handlebar.compile(content)
    const params = {
        name: options.name,
        description: options.description,
        author: options.author
    }
    const result = template(params)
    fs.writeFileSync(packagePath, result)
    console.log("modify package.json complete")
    
}