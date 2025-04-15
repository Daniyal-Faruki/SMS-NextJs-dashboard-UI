'use client';

import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import axios from 'axios';
// import { format } from 'date-fns';

import { EmployeeReward } from '@/models/employee-reward.model';
// import { handleError } from '@/components/errorHandler';
// import { useAuthHeaders } from '@/hooks/useAxiosWithAuth';

interface Props {
    employeeUid: string | null;
    startDate: string;
    endDate: string;
    organizationKey: string;
    reloadTable: () => void;
    handleClosePanel: () => void;
    ComponentToLoad?: string;     // ✅ Make optional if not used
    data?: EmployeeReward[];      // ✅ Make optional if not used
  }

const SpecificEmployeeRewards: React.FC<Props> = ({
  employeeUid,
  startDate,
  endDate,
  organizationKey,
  reloadTable,
  handleClosePanel,
}) => {
  const [rewards, setRewards] = useState<EmployeeReward[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
//   const { getAuthHeaders } = useAuthHeaders();

  useEffect(() => {
    if (employeeUid) {
      fetchEmployeeRewards();
    }
  }, [employeeUid, startDate, endDate]);

  const fetchEmployeeRewards = async () => {
    setLoading(true);
    setError('');

    // try {
    //   const headers = await getAuthHeaders();
    //   const res = await axios.get(
    //     `https://localhost:7192/api/v1/organizations/${organizationKey}/employee-rewards/${employeeUid}?startDate=${startDate}&endDate=${endDate}`,
    //     { headers }
    //   );
    //   setRewards(res.data);
    // } catch (err) {
    //   const message = handleError(err);
    //   setError(message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="p-4 w-full max-w-[500px]">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6">Employee Rewards</Typography>
        <IconButton onClick={handleClosePanel}>
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
        <Typography>No rewards found for selected date range.</Typography>
      )}

      {!loading && rewards.length > 0 && (
        <div className="flex flex-col gap-2">
          {rewards.map((reward, index) => (
            <Paper key={index} className="p-3 border border-gray-200">
              <Typography>
                <strong>Points:</strong> {reward.points}
              </Typography>
              <Typography>
                <strong>Type:</strong> {reward.reward}
              </Typography>
              <Typography>
                {/* <strong>Date:</strong> {format(new Date(reward.assignedAt), 'dd MMM yyyy')} */}
              </Typography>
              <Typography>
                <strong>Note:</strong> {reward.reason || 'N/A'}
              </Typography>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecificEmployeeRewards;
