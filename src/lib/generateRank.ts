import { RankEnums } from "./enum/ranks"

export default (recommandCount: number) => {
  switch (recommandCount / 10) {
    case 0:
      return RankEnums.BRONZE;

    case 1:
      return RankEnums.SILVER;

    case 2:
      return RankEnums.GOLD;

    case 3:
      return RankEnums.PLATINUM;

    case 4:
      return RankEnums.DIAMOND;

    case 5:
      return RankEnums.MASTER;

    default:
      return RankEnums.CHALLENGER;
  }
}