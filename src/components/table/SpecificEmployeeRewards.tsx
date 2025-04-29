"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { EmployeeReward } from "@/models/employee-reward.model";
import { handleError } from "../shared/errorHandler";
import { specificEmployeeRewards } from "@/services/employeeRewardService";
import { useApi } from "@/hooks/useApi";
import { formatDate } from "@/utils/dateUtils";
import noImage from "../../assets/icons/noImage.jpg";
import PointBullet from "../../assets/icons/pointBullet.svg";
import Calender from "../../assets/icons/calender.svg";
import User from "../../assets/icons/user.svg";
import Image from "next/image";

interface Props {
  employeeUid: string | null;
  startDate: string;
  endDate: string;
  organizationKey: string;
  reloadTable: () => void;
  onClose: () => void;
  ComponentToLoad?: string; // ✅ Make optional if not used
  data?: EmployeeReward[]; // ✅ Make optional if not used
}

const SpecificEmployeeRewards: React.FC<Props> = ({
  employeeUid,
  startDate,
  endDate,
  organizationKey,
  reloadTable,
  onClose,
}) => {
  const [rewards, setRewards] = useState<EmployeeReward[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const api = useApi();
  const [totalPoints, setTotalPoints] = useState(0);
  //   const { getAuthHeaders } = useAuthHeaders();

  useEffect(() => {
    let isMounted = true;
    const fetchEmployeeRewards = async () => {
      try {
        if (!employeeUid) {
          console.warn("No employeeUid provided");
          return;
        }
        const payload = {
          employeeUid: employeeUid,
          startDate: startDate,
          endDate: endDate,
        };
        console.log("Payload for Specific-ER: ", payload);
        const data = await specificEmployeeRewards(api, "ZIN", payload);
        console.log("Specific Employee-Rewards Data: ", data);
        if (isMounted) {
          // setEmployees(data);
          // ✅ Calculate total reward points
          const totalPoints = data.reduce(
            (sum: number, reward: EmployeeReward) => {
              return sum + (reward.points || 0); // Safe fallback if points is undefined
            },
            0
          );
          setTotalPoints(totalPoints);
          setRewards(data);
        }
      } catch (error) {
        const errorHandlerMessage = handleError(error);
        console.log("Error SpecificEmployeeRewards: ", error);
        if (isMounted) {
          // setOpenSnackbar(true);
          // setSnackbarSeverity("error");
          // setSnackbarMessage(errorHandlerMessage);
        }
      }
    };

    fetchEmployeeRewards();

    return () => {
      isMounted = false;
    };
  }, [employeeUid, startDate, endDate]);

  return (
    <div className="p-4 w-full max-w-96 border rounded-xl ">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6">Employee Rewards</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      {loading && (
        <div className="flex justify-center py-6">
          <CircularProgress />
        </div>
      )}

      {error && <Typography color="error">{error}</Typography>}

      {!loading && rewards.length === 0 && (
        <div className="flex justify-center py-6">
          <CircularProgress />
          <Typography>No rewards found for selected date range.</Typography>
        </div>
      )}

      {!loading && rewards.length > 0 && (
        <div className="">
          <div className="flex items-center gap-x-2">
            <Image src={noImage} alt="app-logo" width={32} height={32} />
            <span className="editSidenavName">{rewards[0].employeeName}</span>
          </div>

          <div className="mt-4 max-sm:mt-1">
            <div className="editRewards">
              <div className="mb-2 max-sm:mb-1">
                <p className="specific-rewards-data">Total points</p>
                <span className="specific-rewards-data">{totalPoints}</span>
              </div>
              <div className="inner-div-container">
                {rewards.map((item, index) => (
                  <div className="inner-div mt-1" key={index}>
                    <div className="line-container">
                      <PointBullet className="w-3 h-3" />
                      <div className="vertical-line"></div>
                    </div>
                    <div className="achievementDetails ">
                      <span className="achievement">
                        {formatDate(item.startDate)} -{" "}
                        {formatDate(item.endDate)}
                      </span>
                      <div className="flex justify-between gap-x-3 max-sm:gap-x-0 mt-1">
                        <div>
                          <p>
                            <Calender className="w-3 inline mr-2" />
                            {formatDate(item.assignedAt ?? "")}
                          </p>
                          <span className="ml-5 specific-rewards-data">
                            {item.points}
                          </span>
                        </div>
                    {/* // TODO */}
                        {/* {item.reward !== "Bonus" &&
                          checkDeleteEditRewardValidity(item.periodUid) &&
                          canEdit &&
                          canDelete && (
                            <div className="flex gap-x-5">
                              <button
                                onClick={(
                                  event: React.MouseEvent<HTMLButtonElement>
                                ) => openAddEmployeeRewardsDialog(event, item)}
                                color="primary"
                                className="btn-edit flex items-center"
                              >
                                <img
                                  className="w-14 h-14 inline cursor-pointer"
                                  src="assets/icons/edit-pencil.svg"
                                  alt="edit-pencil Here"
                                />
                                <span className="ml-5">Edit</span>
                              </button>

                              <button
                                onClick={(
                                  event: React.MouseEvent<HTMLButtonElement>
                                ) => openConfirmationDialog(event, item)}
                                color="primary"
                                className="btn-delete flex items-center"
                              >
                                <img
                                  className="w-14 h-14 inline cursor-pointer"
                                  src="assets/icons/trash-red.svg"
                                  alt="trash-red Here"
                                />
                              </button>
                            </div>
                          )} */}
                      </div>

                      <div className="mt-1 grid grid-cols-2 gap-x-6">
                        <div>
                          <p>Achievement</p>
                          {/* <!-- class "achievement" removing this capsule color class --> */}
                            <span className="specific-rewards-data">
                              {item.reward}
                            </span>
                        </div>
                        <div>
                          <p>
                            <User className="w-3 inline mr-3" />
                            Assigned by
                          </p>
                          <span className="ml-5 flex items-center specific-rewards-data">
                            <Image
                              src={noImage}
                              alt="app-logo"
                              width={25}
                              height={25}
                            />
                            {item.assignedBy ? item.assignedBy : "Manager Here"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-1">
                        <p>Reason</p>
                        <div className="flex">
                          <span className="specific-rewards-data">
                            {item.reason}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecificEmployeeRewards;
