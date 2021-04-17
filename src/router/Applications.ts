interface ApplicationsType {
  [appName: string]: {
    name: string;
    appName: string;
    description: string;
    isUnderConstruction?: boolean;
  };
}

export const Applications: ApplicationsType = {
  pricePerUnit: {
    name: 'pricePerUnit',
    appName: 'Price Per Unit',
    description: `This is a Browser Extension
      that allows you to parse through grocery
      sites to find the best price per some unit.`,
    isUnderConstruction: true,
  },
  kkbo: {
    name: 'kkbo',
    appName: 'KKBO',
    description: `This is a WebApp that allows you to
      easily track and manage your expenses based off
      the Japanese saving method, Kakeibo.
    `,
    isUnderConstruction: true
  }
};

export const getApplicationName = (
  appName: string | string[],
): string => {
  if (Array.isArray(appName)) {
    // eslint-disable-next-line
    for (const _name of appName) {
      const { name } = Applications[_name as keyof typeof Applications];
      if (name !== undefined) return name;
    };
  }
  const { name } = Applications[appName as keyof typeof Applications];
  if (name !== undefined) return name;
  throw new Error(`${appName} not present in Applications. Check spelling or add to applications`);
};

export const isKeyOfApplications = (
  appName: string | number,
): appName is keyof typeof Applications =>
  Applications[appName as keyof typeof Applications] !== undefined;
