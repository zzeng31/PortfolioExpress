const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
// @route   GET api/profile/me
// @desc    Get current users profile
// @access  privite
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route Post api/profile
// @desc Create or update user profile
// @access private
router.post(
  "/",
  [
    auth,
    check("status", "status is required").not().isEmpty(),
    check("skills", "skills is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //build profile
    const profilefield = {};
    profilefield.user = req.user.id;
    if (company) profilefield.company = company;
    if (website) profilefield.website = website;
    if (location) profilefield.location = location;
    if (bio) profilefield.bio = bio;
    if (status) profilefield.status = status;
    if (githubusername) profilefield.githubusername = githubusername;
    if (youtube) profilefield.youtube = youtube;
    if (facebook) profilefield.fabebook = facebook;
    if (twitter) profilefield.twitter = twitter;
    if (instagram) profilefield.instagram = instagram;
    if (linkedin) profilefield.linkedin = linkedin;
    if (skills) {
      profilefield.skills = skills.split(",").map((skill) => skill.trim());
    }
    console.log(skills);
    //build social object
    profilefield.social = {};
    if (youtube) profilefield.social.youtube = youtube;
    if (twitter) profilefield.social.twitter = twitter;
    if (facebook) profilefield.social.facebook = facebook;
    if (linkedin) profilefield.social.linkedin = linkedin;
    if (instagram) profilefield.social.instagram = instagram;
    //res.send("Hello")
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefield },
          { new: true }
        );

        return res.json(profile);
      } else {
        profile = new Profile(profilefield);
        await profile.save();
        res.json(profile);
      }
    } catch (error) {
      console.error(error.message);
      json.status(500).send("Server error");
    }
  }
);

// @route GET api/profile
// @desc Get all profile
// @access public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access public
router.get("/user/:user_id", async ({ params: { user_id } }, res) => {
  try {
    const profile = await Profile.findOne({
      user: user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route DELETE api/profile
// @desc Delete user, profile and posts
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    // @Todo - remove users posts
    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/profile/experience
// @desc Add profile experience
// @access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").notEmpty(),
      check("company", "Company is required").notEmpty(),
      check("from", "From date is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructuring
    const { title, company, location, from, to, current, description } =
      req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc Delete experience from profile
// @access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    //Remove experience from profile
    profile.experience.splice(removeIndex, 1);
    // Save profile
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/profile/education
// @desc Add profile education
// @access Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").notEmpty(),
      check("degree", "Degree is required").notEmpty(),
      check("from", "From date is required").notEmpty(),
      check("fieldofstudy", "Field of study date is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructuring
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route DELETE api/profile/education/:edu_id
// @desc Delete education from profile
// @access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    //Remove experience from profile
    profile.education.splice(removeIndex, 1);
    // Save profile
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/profile/github/:username
// @desc Get user repo from  Github
// @access Public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "No Github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "No Github profile found" });
  }
});
module.exports = router;
