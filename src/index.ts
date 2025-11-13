import { PackageManager, getPackageManager } from "./packageManagers";
import { runCheckIsItDeployed } from "./runner";

export const isItDeployed = (args: { packageManager: 'npm' | 'cocoapods' | 'maven' | 'jsr', packageName: string, packageVersion: string }, opts?: { maxRetries: number | undefined }) => {  
  const packageManager: PackageManager | undefined = getPackageManager(args.packageManager)

  if (!packageManager) throw new Error('Package manager not supported');

  return runCheckIsItDeployed({ packageManager, packageName: args.packageName, packageVersion: args.packageVersion }, { maxRetries: opts?.maxRetries, secondsBetweenRetries: 5 })
}