import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { eventDetail } from "../../types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartVote: React.FC<{
  data: {
    candidates: eventDetail["candidates"];
    voter: eventDetail["registeredVoters"];
  };
}> = ({ data }) => {
  const dataset = [
    {
      label: "# of Votes",
      data: [
        ...data.candidates.map((v) => v.numOfVotes),
        data.voter.filter((v) => !v.hasVoted && v).length,
      ],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ];

  return (
    <Doughnut
      data={{
        datasets: dataset,
        labels: [
          ...data.candidates.map((v) => `${v.calonKetua} & ${v.calonWakil}`),
          "belum vote",
        ],
      }}
    />
  );
};
