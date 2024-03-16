import { AiFillAppstore } from "react-icons/ai";
import { FaMobile, FaGlobe, FaDatabase, FaConnectdevelop} from "react-icons/fa";
import { SiProgress, SiAntdesign, SiDatacamp, SiCodeforces } from "react-icons/si";

// Features Data
export const featuresData = [
  {
    id: 1,
    icon: <FaDatabase />,
    title: "Database Management",
    des: "Developing, protecting and maintaining the systems that store and organise data.",
    tech: "MySQL, PostgreSQL, MongoDB, Neo4j",
  },
  {
    id: 2,
    icon: <AiFillAppstore />,
    title: "Back-end Development",
    des: "Creation of robust and efficient REST APIs to enable better communication between databases. ",
    tech: "Spring Boot, Express JS, Django Rest Framework",
  },
  {
    id: 3,
    icon: <SiProgress />,
    title: "Project Manager",
    des: "Organising and planning the various stages of a project using the SCRUM agile method.",
    tech: "Jira",
  },
  {
    id: 4,
    icon: <FaMobile />,
    title: "Mobile Development",
    des: "Use programming languages and development skills to create, test and develop applications on mobile devices with iOS or Android operating systems.",
    tech: "Android, Flutter, React Native",
  },
  {
    id: 5,
    icon: <SiCodeforces />,
    title: "Data Science",
    des: "Use of machine learning algorithms for natural language processing or prediction.",
    tech: "Python, nltk, Scikit-learn, Tensorflow"
  },
  {
    id: 6,
    icon: <FaGlobe />,
    title: "Web Developement",
    des: "Developing responsive web interfaces with a good UI/UX.",
    tech: "Angular, React JS, HTML, CSS, BootStrap"
  },
  {
    id: 6,
    icon: <FaConnectdevelop />,
    title: "Distributed System",
    des: "Implementation and testing of algorithms in a decentralized environment. ",
    tech: "Federated Learning, Flower, DecLearn, P2P, Tensorflow, Pytorch, Rust, Python"
  },
];
