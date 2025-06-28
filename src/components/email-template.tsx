interface Job {
  _id: string;
  postName: string;
  department: string;
  lastDate: string;
  imageUrl: string;
  jobDescription: string;
}

export const EmailTemplate = ({ jobs }: { jobs: Job[], }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        color: "#333",
      }}
    >
      <h2 style={{ color: "#0d9488" }}>Hey PSC Buddy 🎖️</h2>
      <p style={{ fontSize: "16px" }}>
        I hope you&apos;re doing great and working hard to achieve your dream job!
        Here&apos;s your latest <strong>Kerala PSC Live</strong> job alert to keep you on
        track 🚀
      </p>

      <hr style={{ margin: "20px 0" }} />

      {jobs.map((job) => {
        const jobUrl = `https://www.keralapsclive.com/jobs/${job._id}`;
        const encodedTitle = encodeURIComponent(job.postName);
        const encodedUrl = encodeURIComponent(jobUrl);

        return (
          <div
            key={job._id}
            style={{
              marginBottom: "30px",
              padding: "15px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <img
              src={job.imageUrl}
              alt={job.postName}
              width="100%"
              style={{
                borderRadius: "6px",
                marginBottom: "10px",
                maxHeight: "200px",
                objectFit: "cover",
              }}
            />
            <h3 style={{ margin: "5px 0", color: "#111827" }}>{job.postName}</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>
              <strong>Department:</strong> {job.department} <br />
              <strong>Last Date to Apply:</strong>{" "}
              <span style={{ color: "#dc2626" }}>{job.lastDate}</span>
            </p>
            <p style={{ marginTop: "10px", fontSize: "14px", lineHeight: "1.5" }}>
              {job.jobDescription.slice(0, 200)}...
            </p>
            <a
              href={jobUrl}
              style={{
                display: "inline-block",
                marginTop: "10px",
                backgroundColor: "#10b981",
                color: "#fff",
                padding: "10px 15px",
                textDecoration: "none",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            >
              🔍 View Job Details
            </a>

            {/* Static Share Links */}
            <div style={{ marginTop: "15px", fontSize: "14px" }}>
              <span style={{ fontWeight: "bold" }}>Share:</span>{" "}
              <a
                href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                style={{ marginRight: "10px", color: "#25D366", textDecoration: "none" }}
              >
                WhatsApp
              </a>
              <a
                href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
                style={{ marginRight: "10px", color: "#0088cc", textDecoration: "none" }}
              >
                Telegram
              </a>
              <a
                href="https://www.instagram.com/your_kerala_psc_live_profile"
                style={{ color: "#E1306C", textDecoration: "none" }}
              >
                Instagram
              </a>
            </div>
          </div>
        );
      })}

      <p style={{ marginTop: "40px", fontSize: "14px", color: "#6b7280" }}>
        Stay tuned with <strong>www.keralapsclive.com</strong> for more updates.
        Never miss a dream opportunity again!
      </p>
    </div>
  );
};
