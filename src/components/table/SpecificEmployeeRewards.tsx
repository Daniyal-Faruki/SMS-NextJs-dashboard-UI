"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { EmployeeReward } from "@/models/employee-reward.model";
import {
  deleteEmployeeReward,
  fetchEmployeeRewardsLookups,
  specificEmployeeRewards,
} from "@/services/employeeRewardService";
import { useApi } from "@/hooks/useApi";
import { handleError } from "../shared/errorHandler";
import { formatDate } from "@/utils/dateUtils";
import { Period } from "@/models/period.model";

import ConfirmationDialog from "../shared/confirmationDialog";

import Image from "next/image";
import noImage from "../../assets/icons/noImage.jpg";
import avatar from "../../assets/images/avatar.png";
import PointBullet from "../../assets/icons/pointBullet.svg";
import Calender from "../../assets/icons/calender.svg";
import User from "../../assets/icons/user.svg";
import EditPencil from "../../assets/icons/edit-pencil.svg";
import TrashRed from "../../assets/icons/trash-red.svg";

interface Props {
  employeeUid: string | null;
  startDate: string;
  endDate: string;
  organizationKey: string;
  reloadTable: () => void;
  onClose: () => void;
  ComponentToLoad?: string;
  data?: EmployeeReward[];
  openDialogForEdit: (reward: EmployeeReward, isEditReward?: boolean) => void;
}

const SpecificEmployeeRewards: React.FC<Props> = ({
  employeeUid,
  startDate,
  endDate,
  organizationKey,
  reloadTable,
  onClose,
  openDialogForEdit,
}) => {
  const api = useApi();
  const [rewards, setRewards] = useState<EmployeeReward[]>([]);
  const [periodsRange, setPeriodsRange] = useState<Period[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rewardToDelete, setRewardToDelete] = useState<EmployeeReward | null>(null);

  useEffect(() => {
    if (employeeUid) {
      fetchEmployeeRewards();
      loadEmployeeRewardsLookups();
    }
  }, [employeeUid, startDate, endDate]);

  const fetchEmployeeRewards = async () => {
    try {
      setLoading(true);
      if (!employeeUid) {
        console.warn("No employeeUid provided");
        return;
      }
      
      const payload = {
        employeeUid, // now guaranteed to be string
        startDate,
        endDate,
      };
      const data = await specificEmployeeRewards(api, "ZIN", payload);
      setRewards(data);
      const total = data.reduce((sum, reward) => sum + (reward.points || 0), 0);
      setTotalPoints(total);
    } catch (error) {
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const loadEmployeeRewardsLookups = async () => {
    try {
      const data = await fetchEmployeeRewardsLookups(api, organizationKey);
      setPeriodsRange(data.periods);
    } catch (error) {
      setError(handleError(error));
    }
  };

  const checkDeleteEditRewardValidity = (periodUid: string) => {
    return periodsRange.some((period) => period.uid === periodUid);
  };

  const handleOpenDeleteDialog = (reward: EmployeeReward) => {
    setRewardToDelete(reward);
    setDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setRewardToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!rewardToDelete?.uid) {
      console.warn("Reward UID is missing.");
      return;
    }

    try {
      await deleteEmployeeReward(api, organizationKey, rewardToDelete.uid);
      reloadTable();
      fetchEmployeeRewards();
    } catch (err) {
      console.error("Failed to delete reward:", err);
    } finally {
      handleCancelDelete();
    }
  };

  return (
    
    <div className="w-full border rounded-xl right-drawer">
      <div className="flex items-center mb-3 md:mb-6">
        <div className="mt-3 pl-4 flex items-center gap-x-2 flex-grow">
          {rewards.length > 0 && (
            <>
              <Image src={noImage} alt="user" width={56} height={56} className="rounded-full" />
              <span className="editSidenavName font-medium">{rewards[0].employeeName}</span>
            </>
          )}
        </div>
        <IconButton onClick={onClose} className="ml-auto self-start">
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
          <Typography>No rewards found.</Typography>
        </div>
      )}

      {!loading && rewards.length > 0 && (
        <div className="pl-1 md:pl-4">
          <div className="editRewards">
            <div className="mb-1 md:mb-6">
              <p>Total points</p>
              <span className="specific-rewards-data">{totalPoints}</span>
            </div>

            <div className="inner-div-container pr-4 mr-1">
              {rewards.map((item, index) => (
                <div className="inner-div mt-1" key={index}>
                  <div className="line-container">
                    <PointBullet className="w-3 h-3" />
                    <div className="vertical-line"></div>
                  </div>
                  <div className="achievementDetails">
                    <span className="achievement">
                      {formatDate(item.startDate)} - {formatDate(item.endDate)}
                    </span>

                    <div className="flex justify-between gap-x-3 mt-1 md:mt-2">
                      <div>
                        <p>
                          <Calender className="w-3 inline mr-2" />
                          {formatDate(item.assignedAt ?? "")}
                        </p>
                        <span className="ml-5 specific-rewards-data">{item.points}</span>
                      </div>

                      {item.reward !== "Bonus" && checkDeleteEditRewardValidity(item.periodUid!) && (
                        <div className="flex gap-x-2">
                          <button onClick={() => openDialogForEdit(item, true)} className="btn-edit flex items-center">
                            <EditPencil className="w-4 h-4" />
                            <span className="ml-2">Edit</span>
                          </button>

                          <button
                            onClick={() => handleOpenDeleteDialog(item)}
                            className="btn-delete flex items-center"
                          >
                            <TrashRed className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-1 grid grid-cols-2 gap-x-6">
                      <div>
                        <p>Achievement</p>
                        <span className="specific-rewards-data">{item.reward}</span>
                      </div>
                      <div>
                        <p>
                          <User className="w-3 inline mr-2" />
                          Assigned by
                        </p>
                        <span className="ml-5 flex gap-x-1 items-center specific-rewards-data">
                          {/* <Image src={avatar} alt="app-logo" width={16} height={16} /> */}
                          <Image src="/avatar.png" alt="" width={16} height={16} className="rounded-full"/>
                          {item.assignedBy || "Manager"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1">
                      <p>Reason</p>
                      <span className="specific-rewards-data">{item.reason}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {deleteDialogOpen && (
        <ConfirmationDialog
          open={deleteDialogOpen}
          title="Delete Reward"
          message={
            <>
              Are you sure you want to delete{" "}
              <strong>{rewardToDelete?.employeeName}'s</strong> achievement? This can’t be undone.
            </>
          }
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default SpecificEmployeeRewards;
