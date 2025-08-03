const mongoose = require('mongoose');
const User = require('../models/user');
const Blog = require('../models/blog');
require('dotenv').config();

const sampleUsers = [
  {
    first_name: 'Dr. Sarah',
    last_name: 'Williams',
    email: 'sarah.williams@tammira.com',
    bio: 'Pediatrician and child health advocate at Tammira.',
    profile_pic_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  },
  {
    first_name: 'James',
    last_name: 'Parker',
    email: 'james.parker@tammira.com',
    bio: 'Fitness coach specializing in family wellness.',
    profile_pic_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  },
  {
    first_name: 'Lisa',
    last_name: 'Chen',
    email: 'lisa.chen@tammira.com',
    bio: 'Nutritionist and mental health expert at Tammira.',
    profile_pic_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
  }
];

const sampleBlogs = [
  {
    title: 'The Importance of Physical Activity for Growing Children',
    sub_title: 'How daily movement impacts brain development and long-term health',
    slug: 'physical-activity-for-children',
    content: `Physical activity is crucial for children's growth, affecting everything from bone density to cognitive function. Studies show that kids who engage in at least 60 minutes of moderate exercise daily perform better academically and have lower risks of obesity. At Tammira, we recommend a mix of aerobic activities (running, swimming), muscle-strengthening (climbing, gymnastics), and bone-strengthening (jumping rope) exercises. Parents should limit screen time to under 2 hours per day and encourage outdoor play. Simple habits like walking to school or family bike rides can make a significant difference in a child's health trajectory.`,
    tags: ['children-health', 'fitness', 'parenting', 'child-development'],
    status: 'published'
  },
  {
    title: 'Balanced Nutrition for Students: Fueling Academic Success',
    sub_title: 'How diet affects focus, memory, and energy levels in school-age kids',
    slug: 'nutrition-for-students',
    content: `A student's diet directly impacts their ability to concentrate and retain information. Key nutrients like omega-3 fatty acids (found in fish and walnuts) support brain function, while iron-rich foods (spinach, lentils) prevent fatigue. Tammira’s research shows that students who eat a protein-rich breakfast score 20% higher on memory tests. Avoid sugary cereals and opt for whole-grain toast with avocado or Greek yogurt with berries. Meal prepping healthy snacks (carrot sticks, hummus, almonds) can prevent reliance on vending machine junk food. Hydration is equally critical—dehydration reduces cognitive performance by up to 30%.`,
    tags: ['student-health', 'nutrition', 'academic-performance', 'healthy-eating'],
    status: 'published'
  },
  {
    title: 'Managing Stress: Mental Health Tips for Busy Parents',
    sub_title: 'Practical self-care strategies to avoid burnout',
    slug: 'stress-management-for-parents',
    content: `Parenting is rewarding but exhausting. Chronic stress can weaken immunity and increase risks of heart disease. Tammira’s wellness experts suggest: 1) **Micro-meditation** – even 3 minutes of deep breathing between tasks lowers cortisol levels. 2) **Scheduled "me-time"** – block 15 minutes daily for reading or a hobby. 3) **Social support** – join parent groups (online or local) to share experiences. 4) **Sleep hygiene** – prioritize 7–8 hours of sleep; nap when possible. 5) **Exercise snacking** – short bursts of activity (10 squats, stair climbing) boost endorphins. Remember, a healthy parent raises healthier children.`,
    tags: ['parent-health', 'mental-wellness', 'stress-relief', 'self-care'],
    status: 'published'
  },
  {
    title: 'The Rise of Childhood Obesity: Prevention and Solutions',
    sub_title: 'How families can combat sedentary lifestyles and poor eating habits',
    slug: 'childhood-obesity-prevention',
    content: `Childhood obesity rates have tripled in 20 years, linked to processed foods and decreased physical play. Tammira’s pediatric team advises: 1) **Family meals** – kids who eat home-cooked meals consume 50% fewer sugary drinks. 2) **Smart swaps** – replace soda with infused water, chips with air-popped popcorn. 3) **Active hobbies** – enroll kids in sports or dance classes. 4) **Limit fast food** – reserve it for occasional treats. 5) **Role modeling** – children mimic parents; exercise together. Schools can help by banning junk food in cafeterias and mandating daily PE. Early intervention prevents diabetes and hypertension later in life.`,
    tags: ['childhood-obesity', 'healthy-habits', 'preventive-care', 'family-fitness'],
    status: 'published'
  },
  {
    title: 'Screen Time and Eye Health: Protecting Your Child’s Vision',
    sub_title: 'How digital devices affect eyesight and practical safeguards',
    slug: 'screen-time-and-eye-health',
    content: `Excessive screen exposure causes digital eye strain in 60% of children, leading to headaches and blurred vision. Tammira’s optometrists recommend: 1) **20-20-20 rule** – every 20 minutes, look at something 20 feet away for 20 seconds. 2) **Blue light filters** – enable night mode on devices. 3) **Screen distance** – tablets should be 18–24 inches from eyes. 4) **Outdoor time** – natural light reduces myopia progression. 5) **Annual eye exams** – detect issues early. For students, ergonomic setups (monitor at eye level, proper lighting) prevent neck strain. Encourage breaks for physical activity instead of scrolling.`,
    tags: ['child-health', 'digital-wellness', 'eye-care', 'parenting-tips'],
    status: 'published'
  },
  {
    title: 'Building Strong Bones: Calcium and Vitamin D for All Ages',
    sub_title: 'Dietary sources and exercises to prevent osteoporosis',
    slug: 'bone-health-guide',
    content: `Bone density peaks by age 30, making nutrition vital early on. Children need 1,000–1,300 mg of calcium daily (from milk, broccoli, fortified cereals). Vitamin D (sunlight, fatty fish) aids absorption. Tammira’s fitness plans include weight-bearing exercises (jumping jacks, hiking) to strengthen bones. Adults over 50 should increase calcium intake to 1,200 mg and consider supplements if deficient. Seniors can prevent fractures with balance training (yoga, tai chi). Families should cook calcium-rich meals together—try smoothies with kale and almonds or salmon with quinoa.`,
    tags: ['bone-health', 'nutrition', 'fitness', 'family-wellness'],
    status: 'published'
  },
  {
    title: 'Sleep Hygiene for Teens: Why 8 Hours Isn’t Optional',
    sub_title: 'The link between sleep deprivation and academic performance',
    slug: 'teen-sleep-hygiene',
    content: `Teens need 8–10 hours of sleep, yet 70% get less due to homework and social media. Poor sleep lowers grades and increases anxiety. Tammira’s strategies: 1) **Consistent schedule** – same bedtime even on weekends. 2) **No screens 1 hour before bed** – blue light disrupts melatonin. 3) **Caffeine curfew** – no coffee/energy drinks after 2 PM. 4) **Wind-down routine** – reading or light stretching. 5) **Cool, dark room** – ideal temperature is 65°F. Schools can help by starting later; districts with 8:30 AM start times see 20% better test scores. Parents should model good habits—avoid late-night work emails.`,
    tags: ['teen-health', 'sleep', 'academic-success', 'mental-health'],
    status: 'published'
  },
  {
    title: 'Healthy Meal Prep for Busy Families',
    sub_title: 'Time-saving recipes and planning tips for nutritious eating',
    slug: 'family-meal-prep',
    content: `Weekly meal prep saves time and reduces reliance on takeout. Tammira’s nutritionists suggest: 1) **Batch cooking** – make large portions of quinoa, grilled chicken, or soups. 2) **Pre-cut veggies** – store in jars for quick snacks. 3) **Freezer-friendly meals** – lentil stew or whole-grain pancakes. 4) **Kids’ involvement** – let them assemble lunchboxes (e.g., DIY wraps). 5) **Theme nights** – "Meatless Monday" or "Fish Friday" for variety. Sample plan: Breakfast—overnight oats with chia seeds. Lunch—bento boxes with hummus and bell peppers. Dinner—sheet-pan salmon with sweet potatoes. Invest in quality containers to keep food fresh.`,
    tags: ['nutrition', 'meal-prep', 'healthy-eating', 'family'],
    status: 'published'
  },
  {
    title: 'The Benefits of Yoga for Kids and Adults',
    sub_title: 'How mindfulness and movement improve physical and mental health',
    slug: 'yoga-for-families',
    content: `Yoga boosts flexibility, focus, and emotional regulation. For kids, animal-themed poses (Downward Dog, Cobra) make it fun while improving coordination. Teens benefit from stress-relief sequences (Child’s Pose, Legs-Up-the-Wall). Adults can reduce back pain with Cat-Cow stretches or Sun Salutations. Tammira’s classes show that families practicing together report better communication and less anxiety. Start with 10-minute sessions—try "Yoga Jar" (pick random poses from a jar). Schools incorporating yoga see fewer behavioral incidents. No equipment is needed—just a mat or soft carpet.`,
    tags: ['yoga', 'mental-health', 'fitness', 'mindfulness'],
    status: 'published'
  },
  {
    title: 'Hydration Myths and Facts: What You Really Need Daily',
    sub_title: 'Debunking common misconceptions about water intake',
    slug: 'hydration-guide',
    content: `The "8 glasses a day" rule is outdated—needs vary by weight and activity. Tammira’s guidelines: 1) **Kids (4–8 years)** – 5 cups; **Teens** – 7–11 cups. 2) **Adults** – half your weight (lbs) in ounces (e.g., 150 lbs = 75 oz). 3) **Exercise** – add 1.5–2.5 cups per hour of sweat. Signs of dehydration: dark urine, fatigue, dizziness. Infuse water with fruits (lemons, berries) for picky drinkers. Avoid sugary sports drinks unless doing intense workouts. Soups and water-rich foods (cucumbers, watermelon) count. Carry a reusable bottle—stainless steel keeps water cooler longer.`,
    tags: ['hydration', 'nutrition', 'health-tips', 'wellness'],
    status: 'published'
  },
  {
    title: 'Preventing Sports Injuries in Young Athletes',
    sub_title: 'Warm-ups, rest days, and proper gear to stay safe',
    slug: 'sports-injury-prevention',
    content: `Overuse injuries in youth sports have risen by 50% due to year-round training. Tammira’s coaches recommend: 1) **Dynamic warm-ups** – leg swings, high knees. 2) **Rest days** – at least 1–2 per week. 3) **Cross-training** – mix swimming with soccer to avoid repetitive strain. 4) **Proper footwear** – replace shoes every 300–500 miles. 5) **Concussion awareness** – head injuries require immediate rest. Parents should watch for pain (not just "soreness") and prioritize recovery nutrition (protein, antioxidants). Open communication with coaches prevents burnout.`,
    tags: ['sports', 'injury-prevention', 'fitness', 'child-health'],
    status: 'published'
  },
  {
    title: 'The Gut-Brain Connection: How Diet Affects Mood',
    sub_title: 'Probiotics, fiber, and foods that reduce anxiety',
    slug: 'gut-brain-health',
    content: `The gut microbiome produces 90% of serotonin, influencing mood and stress. Tammira’s research highlights: 1) **Fermented foods** – yogurt, kimchi, kefir boost good bacteria. 2) **Fiber-rich diets** – whole grains feed gut microbes. 3) **Omega-3s** – salmon and flaxseeds reduce inflammation linked to depression. 4) **Limit processed sugar** – spikes and crashes worsen anxiety. Kids with balanced diets show 30% fewer emotional outbursts. Try a "gut-healthy" day: Breakfast—oatmeal with bananas. Lunch—quinoa salad with chickpeas. Dinner—baked salmon with asparagus.`,
    tags: ['mental-health', 'nutrition', 'gut-health', 'wellness'],
    status: 'published'
  },
  {
    title: 'Workplace Wellness: Staying Active at a Desk Job',
    sub_title: 'Stretches, ergonomics, and habits to combat sedentariness',
    slug: 'desk-job-wellness',
    content: `Sitting for 8+ hours daily increases risks of diabetes and back pain. Tammira’s corporate program includes: 1) **Standing desks** – alternate every 30 minutes. 2) **Mini workouts** – chair squats, seated leg lifts. 3) **Walking meetings** – 10-minute discussions on the move. 4) **Posture checks** – ears aligned with shoulders. 5) **Eye breaks** – reduce screen glare with the 20-20-20 rule. Apps like "Stand Up!" remind you to move. Pack resistance bands for discreet stretches. Hydrate often—trips to the water bottle add steps. Small changes prevent long-term health decline.`,
    tags: ['adult-health', 'fitness', 'ergonomics', 'workplace-wellness'],
    status: 'published'
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/SampleBlogs');
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Blog.deleteMany({});
    console.log('Cleared existing data');

    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`Created ${createdUsers.length} users`);

    const blogsWithAuthors = sampleBlogs.map(blog => ({
      ...blog,
      author: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
    }));

    const createdBlogs = await Blog.insertMany(blogsWithAuthors);
    console.log(`Created ${createdBlogs.length} blogs`);

    console.log('Tammira healthcare blogs seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();