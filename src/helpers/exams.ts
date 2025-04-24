import { exam2019A_FE_AM } from "../encryptedExams/2019A_FE_AM";
import { exam2019S_FE_AM } from "../encryptedExams/2019S_FE_AM";

import { exam2020A_FE_AM } from "../encryptedExams/2020A_FE_AM";
import { exam2020S_FE_AM } from "../encryptedExams/2020S_FE_AM";

import { exam2021A_FE_AM } from "../encryptedExams/2021A_FE_AM";
import { exam2021S_FE_AM } from "../encryptedExams/2021S_FE_AM";

import { exam2022A_FE_AM } from "../encryptedExams/2022A_FE_AM";
import { exam2022S_FE_AM } from "../encryptedExams/2022S_FE_AM";

import { exam2023A_FE_AM } from "../encryptedExams/2023A_FE_AM";
import { exam2023S_FE_AM } from "../encryptedExams/2023S_FE_AM";

import { exam2024A_FE_AM } from "../encryptedExams/2024A_FE_AM";
import { exam2024S_FE_AM } from "../encryptedExams/2024S_FE_AM";

import { exam2024A_FE_PM } from "../encryptedExams/2024A_FE_PM";
import { exam2024S_FE_PM } from "../encryptedExams/2024S_FE_PM";

import { decryptData } from "../utils/encrypt";

export const examOptions: Record<string, { items: any[]; itemCount: number }> =
  {
    "2024S_FE_PM": {
      items: decryptData(exam2024S_FE_PM),
      itemCount: decryptData(exam2024S_FE_PM).length,
    },
    "2024A_FE_PM": {
      items: decryptData(exam2024A_FE_PM),
      itemCount: decryptData(exam2024A_FE_PM).length,
    },

    "2024S_FE_AM": {
      items: JSON.parse(decryptData(exam2024S_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2024S_FE_AM)).length,
    },
    "2024A_FE_AM": {
      items: JSON.parse(decryptData(exam2024A_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2024A_FE_AM)).length,
    },

    "2023S_FE_AM": {
      items: JSON.parse(decryptData(exam2023S_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2023S_FE_AM)).length,
    },
    "2023A_FE_AM": {
      items: JSON.parse(decryptData(exam2023A_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2023A_FE_AM)).length,
    },

    "2022S_FE_AM": {
      items: JSON.parse(decryptData(exam2022S_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2022S_FE_AM)).length,
    },
    "2022A_FE_AM": {
      items: JSON.parse(decryptData(exam2022A_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2022A_FE_AM)).length,
    },

    "2021S_FE_AM": {
      items: JSON.parse(decryptData(exam2021S_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2021S_FE_AM)).length,
    },
    "2021A_FE_AM": {
      items: JSON.parse(decryptData(exam2021A_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2021A_FE_AM)).length,
    },

    "2020S_FE_AM": {
      items: JSON.parse(decryptData(exam2020S_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2020S_FE_AM)).length,
    },
    "2020A_FE_AM": {
      items: JSON.parse(decryptData(exam2020A_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2020A_FE_AM)).length,
    },

    "2019S_FE_AM": {
      items: JSON.parse(decryptData(exam2019S_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2019S_FE_AM)).length,
    },
    "2019A_FE_AM": {
      items: JSON.parse(decryptData(exam2019A_FE_AM)),
      itemCount: JSON.parse(decryptData(exam2019A_FE_AM)).length,
    },
  };
