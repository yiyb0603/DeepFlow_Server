import { ERank } from './enum/ranks';

export default (recommandCount: number) => {
  const divideCount: number = Math.floor(recommandCount / 10);

  switch (divideCount) {
    case 0:
      return ERank.BRONZE;

    case 1:
      return ERank.SILVER;

    case 2:
      return ERank.GOLD;

    case 3:
      return ERank.PLATINUM;

    case 4:
      return ERank.DIAMOND;

    case 5:
      return ERank.MASTER;

    default:
      return ERank.CHALLENGER;
  }
}