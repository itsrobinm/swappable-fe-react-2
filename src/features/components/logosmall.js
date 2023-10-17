export const LogoSmall = () => {
  return (
    <div className="py-4">
    <div
      className="relative mx-auto"
      style={{
        width: "3rem",
        height: "1.5rem",
        boxShadow: "0 0 0 6px #ef0000",
        borderRadius: "10px",
        borderBottomLeftRadius: "0px",
      }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 bg-blue-700 flex justify-center items-center"
        style={{
          width: "4.75rem",
          height: "0.65rem",
          borderRadius: "19px",
        }}
      >
      </div>
    </div>
    </div>
  );
};
