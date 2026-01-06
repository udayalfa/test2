import Jewellery from "../models/jewellary.js";
import { jewelleryValidation } from "../validators/jewellaryValidation.js";

// ================= CREATE JEWELLERY =================
export const createJewellery = async (req, res) => {
  const {
    name,
    shortDescription,
    description,
    category,
    gender,
    metalType,
    purity,
    weight,
    stoneType,
    stock,
  } = req.body;
  try {
    // 1️⃣ Validate request body
    const { error } = jewelleryValidation.validate(
      {
        name,
        shortDescription,
        description,
        category,
        gender,
        metalType,
        purity,
        weight,
        stoneType,
        stock,
      },
      {
        abortEarly: false,
      }
    );
    console.log(error);
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // 2️⃣ Validate images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least 1 image is required",
      });
    }

    if (req.files.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 images allowed",
      });
    }

    // 3️⃣ Prepare image URLs (Cloudinary or multer path)
    const imageUrls = req.files.map((file) => file.path);
    console.log("imageurls----", imageUrls);
    // 4️⃣ Destructure validated fields from req.body

    // 5️⃣ Create jewellery in DB
    const jewellery = await Jewellery.create({
      name,
      shortDescription,
      description,
      category,
      gender,
      metalType,
      purity,
      weight, // store as string or number based on your schema
      stoneType,
      stock,
      images: imageUrls,
    });

    res.status(201).json({
      success: true,
      message: "Jewellery created successfully",
      jewellery,
    });
  } catch (err) {
    console.error("Create jewellery error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create jewellery",
      error: err.message,
    });
  }
};

// ================= GET ALL JEWELLERY =================
export const getAllJewellery = async (req, res) => {
  try {
    const jewellery = await Jewellery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, jewellery });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ================= GET SINGLE JEWELLERY =================
export const getJewelleryById = async (req, res) => {
  try {
    const jewellery = await Jewellery.findById(req.params.id);
    if (!jewellery) {
      return res.status(404).json({
        success: false,
        message: "Jewellery not found",
      });
    }
    res.status(200).json({ success: true, data: jewellery });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getHomeJewellery = async (req, res) => {
  try {
    const limit = 10;
    const products = await Jewellery.aggregate([{ $sample: { size: limit } }]);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch home jewellery",
    });
  }
};

// ================= DELETE JEWELLERY =================
export const deleteJewellery = async (req, res) => {
  try {
    const jewellery = await Jewellery.findByIdAndDelete(req.params.id);

    if (!jewellery) {
      return res.status(404).json({
        success: false,
        message: "Jewellery not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Jewellery deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getJewelleryByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const jewellery = await Jewellery.find({ category })
      .lean()
      .sort({
        createdAt: -1,
      });

    if (jewellery.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No jewellery found for category: ${category}`,
      });
    }

    res.status(200).json({
      success: true,
      count: jewellery.length,
      data: jewellery,
    });
  } catch (error) {
    console.error("Get jewellery by category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jewellery",
      error: error.message,
    });
  }
};

export const getFullJewelleryByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const jewellery = await Jewellery.find({ category }).lean().sort({
      createdAt: -1,
    });

    if (jewellery.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No jewellery found for category: ${category}`,
      });
    }
    res.status(200).json({
      success: true,
      count: jewellery.length,
      data: jewellery,
    });
  } catch (error) {
    console.error("Get jewellery by category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jewellery",
      error: error.message,
    });
  }
};

export const updateJewellery = async (req, res) => {
  try {
    const { id } = req.params;
    const jewellery = await Jewellery.findById(id);
    if (!jewellery) {
      return res.status(404).json({
        success: false,
        message: "Jewellery not found",
      });
    }
    let existingImages = [];
    if (jewellery.images) {
      existingImages = Array.isArray(jewellery.images)
        ? jewellery.images
        : [jewellery.images];
    }

    const newImages = req.files?.map((file) => file.path) || [];

    console.log("new imaghes are ---", newImages);
    const finalImages = [...existingImages, ...newImages];

    if (finalImages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least 1 image is required",
      });
    }

    if (finalImages.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 images allowed",
      });
    }

    const updatableFields = [
      "name",
      "shortDescription",
      "description",
      "category",
      "gender",
      "metalType",
      "purity",
      "weight",
      "stoneType",
      "stock",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        jewellery[field] = req.body[field];
      }
    });
    console.log(finalImages);
    jewellery.images = finalImages;
    await jewellery.save();

    res.status(200).json({
      success: true,
      message: "Jewellery updated successfully",
      jewellery,
    });
  } catch (err) {
    console.error("Update jewellery error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update jewellery",
      error: err.message,
    });
  }
};
