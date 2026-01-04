import nodemailer from "nodemailer";

export const sendContactMail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: subject || "New Contact Form Message",
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f6f6f6;padding:30px;">
          <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background:linear-gradient(135deg,#c9a44d,#e6c77d);padding:20px;text-align:center;">
              <h1 style="margin:0;color:#fff;letter-spacing:1px;">Contact Request</h1>
              <p style="margin:5px 0 0;color:#fff;font-size:14px;">Website Contact Form</p>
            </div>

            <!-- Content -->
            <div style="padding:25px;">
              <p style="font-size:15px;color:#444;">
                A new message has been submitted through your website contact form.
              </p>

              <!-- Info Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:15px;">
                <tr>
                  <td style="padding:8px 0;font-weight:600;color:#555;">Name</td>
                  <td style="padding:8px 0;color:#333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-weight:600;color:#555;">Email</td>
                  <td style="padding:8px 0;color:#333;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-weight:600;color:#555;">Phone</td>
                  <td style="padding:8px 0;color:#333;">${phone || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-weight:600;color:#555;">Subject</td>
                  <td style="padding:8px 0;color:#333;">${subject || "N/A"}</td>
                </tr>
              </table>

              <!-- Message -->
              <div style="margin-top:20px;">
                <h3 style="margin-bottom:8px;color:#c9a44d;">Message</h3>
                <p style="background:#faf7f1;padding:15px;border-radius:8px;color:#444;line-height:1.6;">
                  ${message}
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background:#fafafa;padding:15px;text-align:center;font-size:12px;color:#777;">
              This message was sent from your website’s <b>Contact Us</b> form.
            </div>

          </div>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Mail sent successfully" });
  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).json({ success: false, message: "Mail sending failed" });
  }
};

export const sendBuildYourOwn = async (req, res) => {
  try {
    const { name, email, phone, jewelryType, description } = req.body;
    const image = req.file;
    console.log(image);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Build Your Own" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Build Your Own Jewelry Request",
      html: `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f6f6f6; padding:30px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#c9a44d,#e6c77d); padding:20px; text-align:center;">
        <h1 style="margin:0; color:#fff; letter-spacing:1px;">Build Your Own Jewelry</h1>
        <p style="margin:5px 0 0; color:#fff; font-size:14px;">Custom Design Request</p>
      </div>

      <!-- Content -->
      <div style="padding:25px;">
        <p style="font-size:15px; color:#444;">
          A new customer has submitted a custom jewelry request. Below are the details:
        </p>

        <!-- Info Table -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:15px;">
          <tr>
            <td style="padding:8px 0; font-weight:600; color:#555;">Name</td>
            <td style="padding:8px 0; color:#333;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:600; color:#555;">Email</td>
            <td style="padding:8px 0; color:#333;">${email}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:600; color:#555;">Phone</td>
            <td style="padding:8px 0; color:#333;">${phone || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; font-weight:600; color:#555;">Jewelry Type</td>
            <td style="padding:8px 0; color:#333;">${jewelryType || "N/A"}</td>
          </tr>
        </table>

        <!-- Description -->
        <div style="margin-top:20px;">
          <h3 style="margin-bottom:8px; color:#c9a44d;">Design Description</h3>
          <p style="background:#faf7f1; padding:15px; border-radius:8px; color:#444; line-height:1.6;">
            ${description}
          </p>
        </div>

        ${
          image
            ? `
                  <h3 style="color:#c9a44d">Reference Image</h3>
                  <a href="${image.path}" target="_blank">
                    <img 
                      src="${image.path}" 
                      style="max-width:100%;border-radius:10px;border:1px solid #ddd"
                    />
                  </a>
                `
            : ""
        }
      </div>

      <!-- Footer -->
      <div style="background:#fafafa; padding:15px; text-align:center; font-size:12px; color:#777;">
        This request was sent from your website’s <b>Build Your Own Jewelry</b> form.
      </div>

    </div>
  </div>
`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};
