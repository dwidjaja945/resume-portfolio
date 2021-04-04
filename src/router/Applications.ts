enum Applications {
  pricePerUnit = 'Price Per Unit',
}

export const getApplicationName = (
  appName: string | string[],
): string => {
  if (Array.isArray(appName)) {
    // eslint-disable-next-line
    for (const _name of appName) {
      const name = Applications[_name as keyof typeof Applications];
      if (name !== undefined) return name;
    };
  }
  const name = Applications[appName as keyof typeof Applications];
  if (name !== undefined) return name;
  throw new Error(`${appName} not present in Applications. Check spelling or add to applications`);
};

export const isKeyOfApplications = (
  appName: string,
): appName is keyof typeof Applications =>
  Applications[appName as keyof typeof Applications] !== undefined;

export default Applications;
