import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactMail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [process.env.EMAIL_USER],
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

              <div style="margin-top:20px;">
                <h3 style="margin-bottom:8px;color:#c9a44d;">Message</h3>
                <p style="background:#faf7f1;padding:15px;border-radius:8px;color:#444;line-height:1.6;">
                  ${message}
                </p>
              </div>
            </div>

            <div style="background:#fafafa;padding:15px;text-align:center;font-size:12px;color:#777;">
              This message was sent from your website’s <b>Contact Us</b> form.
            </div>

          </div>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (error) {
    console.error("Mail error:", error);
    return res.status(500).json({
      success: false,
      message: "Mail sending failed",
    });
  }
};

export const sendBuildYourOwn = async (req, res) => {
  try {
    const { name, email, phone, jewelryType, description } = req.body;
    const image = req.file; // cloudinary file object

    if (!name || !email || !description) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    await resend.emails.send({
      from: "Build Your Own <onboarding@resend.dev>",
      to: [process.env.EMAIL_USER],
      replyTo: email,
      subject: "New Build Your Own Jewelry Request",
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f6f6f6;padding:30px;">
          <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.08);">

            <div style="background:linear-gradient(135deg,#c9a44d,#e6c77d);padding:20px;text-align:center;">
              <h1 style="margin:0;color:#fff;">Build Your Own Jewelry</h1>
              <p style="margin:5px 0 0;color:#fff;font-size:14px;">Custom Design Request</p>
            </div>

            <div style="padding:25px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td><b>Name</b></td><td>${name}</td></tr>
                <tr><td><b>Email</b></td><td>${email}</td></tr>
                <tr><td><b>Phone</b></td><td>${phone || "N/A"}</td></tr>
                <tr><td><b>Jewelry Type</b></td><td>${
                  jewelryType || "N/A"
                }</td></tr>
              </table>

              <div style="margin-top:20px;">
                <h3 style="color:#c9a44d;">Design Description</h3>
                <p style="background:#faf7f1;padding:15px;border-radius:8px;">
                  ${description}
                </p>
              </div>

              ${
                image?.path
                  ? `
                    <div style="margin-top:20px;">
                      <h3 style="color:#c9a44d;">Reference Image</h3>
                      <a href="${image.path}" target="_blank">
                        <img
                          src="${image.path}"
                          style="max-width:100%;border-radius:10px;border:1px solid #ddd;"
                        />
                      </a>
                    </div>
                  `
                  : ""
              }
            </div>

            <div style="background:#fafafa;padding:15px;text-align:center;font-size:12px;color:#777;">
              Sent from Build Your Own Jewelry form.
            </div>

          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Build Your Own error:", error);
    return res.status(500).json({ success: false });
  }
};

export const sendOrderMail = async (req, res) => {
  try {
    const { cartProducts, formData } = req.body;
    const { name, email, phone, address } = formData || {};

    if (!name || !phone || !address || !cartProducts?.length) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const productHTML = cartProducts
      .map(
        (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;">
            <a href="${item.product.images[0]}" target="_blank">
             <img src="${item.product.images[0]}" width="120" />
           </a>
          </td>
          <td style="padding:10px;border-bottom:1px solid #eee;">
            <strong>${item.product.name}</strong><br/>
            <small>ID: ${item.product._id}</small>
          </td>
          <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">
            ${item.totalItems}
          </td>
        </tr>
      `
      )
      .join("");

    await resend.emails.send({
      from: "New Order <onboarding@resend.dev>",
      to: [process.env.EMAIL_USER],
      replyTo: email,
      subject: "🛒 New Order Request",
      html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f6f6f6;padding:30px;">
        <div style="max-width:700px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.08);">

          <!-- Header -->
          <div style="background:#000;padding:20px;text-align:center;">
            <h1 style="margin:0;color:#fff;">New Order Request</h1>
            <p style="margin:5px 0 0;color:#ccc;font-size:14px;">Website Cart Order</p>
          </div>

          <!-- Customer Info -->
          <div style="padding:25px;">
            <h3 style="margin-bottom:10px;color:#000;">Customer Details</h3>
            <table width="100%">
              <tr><td><b>Name</b></td><td>${name}</td></tr>
              <tr><td><b>Email</b></td><td>${email || "N/A"}</td></tr>
              <tr><td><b>Phone</b></td><td>${phone}</td></tr>
              <tr><td><b>Address</b></td><td>${address}</td></tr>
            </table>

            <!-- Products -->
            <h3 style="margin-top:25px;color:#000;">Ordered Products</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              <thead>
                <tr style="background:#fafafa;">
                  <th align="left" style="padding:10px;">Image</th>
                  <th align="left" style="padding:10px;">Product</th>
                  <th align="center" style="padding:10px;">Qty</th>
                </tr>
              </thead>
              <tbody>
                ${productHTML}
              </tbody>
            </table>
          </div>

          <div style="background:#fafafa;padding:15px;text-align:center;font-size:12px;color:#777;">
            This order request was sent from your website cart.
          </div>

        </div>
      </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Order request sent successfully",
    });
  } catch (error) {
    console.error("Order mail error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send order mail",
    });
  }
};
