import { CocoapodsPackageManager } from "./cocoapods"
import { MavenPackageManager } from "./maven"
import { NpmPackageManager } from "./npm"
import { JsrPackageManager } from "./jsr"

export const getPackageManager = (packageManager: string): PackageManager | undefined => {
  switch (packageManager) {
    case 'npm':
      return NpmPackageManager
    case 'jsr':
      return JsrPackageManager
    case 'cocoapods':
      return CocoapodsPackageManager
    case 'maven':
      return MavenPackageManager
  }  

  return undefined
}

export interface PackageManager {  
  doesItExist: (args: { packageName: string, packageVersion: string }) => Promise<boolean>
}