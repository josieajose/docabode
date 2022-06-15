export interface IConfig {
  port: number;
  debugMode: boolean;
  host: string;
}

const checkEnv = (envVar: string, defaultValue?: any) => {
  if (process.env[envVar] === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Please define the Environment variable"${envVar}"`);
  } else {
    return process.env[envVar] as string;
  }
};
export const config: IConfig = {
  debugMode: checkEnv("NODE_ENV", "development") === "development",
  port: parseInt(checkEnv("PORT", 3000), 10),
  host: checkEnv("HOST", "localhost"),
};
