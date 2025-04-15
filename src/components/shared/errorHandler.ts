import axios, { AxiosError } from 'axios';

export const handleError = (error: unknown): string => {
  let errorMessage = 'An unknown error occurred.';

  // Handle Axios-specific errors
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 0) {
      errorMessage = 'Network error: Please check your internet connection.';
    } else if (status === 500) {
      errorMessage = 'Server error: Something went wrong on our end.';
    } else if (status && error.response?.data) {
      const message = (error.response.data as { message?: string }).message;
      errorMessage = message
        ? `Error ${status}: ${message}`
        : `Unexpected server error with status ${status}.`;
    } else if (error.request) {
      errorMessage = 'No response received from the server. Please try again.';
    } else {
      errorMessage = error.message ?? 'An unknown request error occurred.';
    }
  } else if (error instanceof Error) {
    // Handle general JavaScript errors
    errorMessage = `Error: ${error.message}`;
  }

  return errorMessage;
};
