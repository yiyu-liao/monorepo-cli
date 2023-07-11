#!/usr/bin/env node --experimental-specifier-resolution=node
import {Command} from "commander"
import inquirer from "inquirer"
import {downloadTemplate} from "./download"
import { modifyPackageJson } from "./modify"

const templateGitUrl = "https://github.com/yiyu-liao/nestjs-template"
let downloadPath = null

const InitPrompts = [
    {
        name: "description",
        message: "please input description",
        default: "",
    },
    {
        name: "author",
        message: "please input author",
        default: "",
    },
]

const program = new Command()

program
    .name("monorepo-project-cli")
    .description("TypeScript application generator for monorepo project")
    .version("1.0.0")

program
    .command("init <name>")
    .description("init a project")
    .action(async (name: string) => {
        console.log("start init project:", name)
        const initOptions = await inquirer.prompt(InitPrompts)
        console.log("initOptions", initOptions)

        try {
            downloadPath = `./${name}`
            await downloadTemplate(templateGitUrl, downloadPath)
            await modifyPackageJson(downloadPath, { name, ...initOptions })
        } catch (error) {
            console.error(error)
        }
    })

program.parse()
