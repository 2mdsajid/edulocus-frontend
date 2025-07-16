type ShortErrorMessageProps = {
    message: string;
  };

  const ShortErrorMessage = ({ message }: ShortErrorMessageProps) => {
    if (!message) return null;
    return (
      <div className="mt-4 rounded-lg border border-red-400 bg-red-50 p-3 text-center text-sm text-red-700">
        <p>{message}</p>
      </div>
    );
  };

  export default ShortErrorMessage