const Activity = () => {
  return (
    <div className="bg-light border border-muted/20 shadow-sm rounded-lg flex flex-col p-6 mt-6">
      <h3 className="font-semibold text-lg leading-7">Recent Activity</h3>
      <div>
        <p className="text-sm text-muted leading-6">
          No recent activity yet. Start by browsing the lead feed.
        </p>
      </div>
    </div>
  );
};

export default Activity;
