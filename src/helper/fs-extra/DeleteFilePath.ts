import fs from "fs-extra"


export const deleteFilePath = async(path: any) =>{
   await fs.unlink(path)
}
