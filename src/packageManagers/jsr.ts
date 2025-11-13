import { PackageManager } from ".";
import * as http from "tiny-json-http"

export const JsrPackageManager: PackageManager = {
  doesItExist: async (args: { packageName: string, packageVersion: string }) => {    
    try {
      const scope = args.packageName.startsWith('@') ? args.packageName.split('/')[0].substring(1) : ''
      const packageNameWithoutScope = args.packageName.startsWith('@') ? args.packageName.split('/')[1] : args.packageName

      // https://jsr.io/docs/api#jsr-registry-api 
      await http.get({url: `https://jsr.io/@${scope}/${packageNameWithoutScope}/${args.packageVersion}_meta.json`, headers: { 'Accept': 'application/json' }})

      return true 
    } catch (error) {
      return false
    }        
  }
}