/* n8n workflows from the Google Ads agency build, generated from the workflow
   exports. Node names are as built; client details are not included. */

export type WorkflowNodeKind = "trigger" | "code" | "http" | "if" | "slack" | "ai" | "noop" | "ads" | "form";

export type WorkflowNode = {
  id: string;
  name: string;
  kind: WorkflowNodeKind;
  /** Column in the original canvas (left to right). */
  col: number;
  /** 0 = main path, 1 = branch below, -1 = branch above. */
  lane: number;
  /** Not reached on the happy path (e.g. the duplicate-client alert). */
  skip: boolean;
};

export type Workflow = {
  id: string;
  title: string;
  caption: string;
  nodes: WorkflowNode[];
  edges: [string, string][];
};

export const workflows: Workflow[] = [
  {
    "id": "client-onboarding",
    "title": "New client onboarding",
    "caption": "One form submission runs every step: ClickUp client, store and onboarding tasks, a checklist and client doc, two Slack channels, a Slack Connect invite and a pinned welcome.",
    "nodes": [
      {
        "id": "n0",
        "name": "Typeform: Onboarding General",
        "kind": "trigger",
        "col": 0,
        "lane": -1,
        "skip": false
      },
      {
        "id": "n1",
        "name": "Typeform: Onboarding Branded",
        "kind": "trigger",
        "col": 0,
        "lane": 1,
        "skip": true
      },
      {
        "id": "n2",
        "name": "Map Form Fields",
        "kind": "code",
        "col": 1,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n3",
        "name": "Find Existing Client",
        "kind": "http",
        "col": 2,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n4",
        "name": "Client Exists?",
        "kind": "if",
        "col": 3,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n5",
        "name": "Alert: Duplicate Client",
        "kind": "slack",
        "col": 4,
        "lane": 1,
        "skip": true
      },
      {
        "id": "n6",
        "name": "Create Client Task",
        "kind": "http",
        "col": 4,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n7",
        "name": "Build Links",
        "kind": "code",
        "col": 5,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n8",
        "name": "One Item per Store",
        "kind": "code",
        "col": 6,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n9",
        "name": "Create Store Task",
        "kind": "http",
        "col": 7,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n10",
        "name": "Link Store to Client",
        "kind": "http",
        "col": 8,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n11",
        "name": "Collect Stores",
        "kind": "code",
        "col": 9,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n12",
        "name": "Get Onboarding Template",
        "kind": "http",
        "col": 10,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n13",
        "name": "Create Onboarding Task",
        "kind": "http",
        "col": 11,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n14",
        "name": "Link Onboarding to Client",
        "kind": "http",
        "col": 12,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n15",
        "name": "Create Checklist",
        "kind": "http",
        "col": 13,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n16",
        "name": "One Item per Checklist Item",
        "kind": "code",
        "col": 14,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n17",
        "name": "Add Checklist Item",
        "kind": "http",
        "col": 15,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n18",
        "name": "Create Client Doc",
        "kind": "http",
        "col": 16,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n19",
        "name": "Add Client Doc Page",
        "kind": "http",
        "col": 17,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n20",
        "name": "Save Doc Link on Client",
        "kind": "http",
        "col": 18,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n21",
        "name": "Service agreement (planned)",
        "kind": "noop",
        "col": 19,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n22",
        "name": "Get Buyer Load",
        "kind": "http",
        "col": 20,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n23",
        "name": "Format Buyer Load",
        "kind": "code",
        "col": 21,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n24",
        "name": "Client Channels",
        "kind": "code",
        "col": 22,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n25",
        "name": "Create External Channel",
        "kind": "slack",
        "col": 23,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n26",
        "name": "Create Internal Channel",
        "kind": "slack",
        "col": 24,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n27",
        "name": "Invite Team to External",
        "kind": "slack",
        "col": 25,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n28",
        "name": "Invite Team to Internal",
        "kind": "slack",
        "col": 26,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n29",
        "name": "Invite Client (Slack Connect)",
        "kind": "http",
        "col": 27,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n30",
        "name": "Check Slack Connect Invite",
        "kind": "code",
        "col": 28,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n31",
        "name": "One Item per Store Task",
        "kind": "code",
        "col": 28,
        "lane": 1,
        "skip": false
      },
      {
        "id": "n32",
        "name": "Save Channel Links on Store",
        "kind": "http",
        "col": 29,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n33",
        "name": "Post External Welcome",
        "kind": "slack",
        "col": 30,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n34",
        "name": "Pin Welcome",
        "kind": "http",
        "col": 31,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n35",
        "name": "Check Pin",
        "kind": "code",
        "col": 32,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n36",
        "name": "Post Internal Summary",
        "kind": "slack",
        "col": 33,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n37",
        "name": "Save Channel Links on Client",
        "kind": "http",
        "col": 34,
        "lane": 0,
        "skip": false
      }
    ],
    "edges": [
      [
        "n0",
        "n2"
      ],
      [
        "n1",
        "n2"
      ],
      [
        "n2",
        "n3"
      ],
      [
        "n3",
        "n4"
      ],
      [
        "n4",
        "n5"
      ],
      [
        "n4",
        "n6"
      ],
      [
        "n6",
        "n7"
      ],
      [
        "n7",
        "n8"
      ],
      [
        "n8",
        "n9"
      ],
      [
        "n9",
        "n10"
      ],
      [
        "n10",
        "n11"
      ],
      [
        "n11",
        "n12"
      ],
      [
        "n12",
        "n13"
      ],
      [
        "n13",
        "n14"
      ],
      [
        "n14",
        "n15"
      ],
      [
        "n15",
        "n16"
      ],
      [
        "n16",
        "n17"
      ],
      [
        "n17",
        "n18"
      ],
      [
        "n18",
        "n19"
      ],
      [
        "n19",
        "n20"
      ],
      [
        "n20",
        "n21"
      ],
      [
        "n21",
        "n22"
      ],
      [
        "n22",
        "n23"
      ],
      [
        "n23",
        "n24"
      ],
      [
        "n24",
        "n25"
      ],
      [
        "n25",
        "n26"
      ],
      [
        "n26",
        "n27"
      ],
      [
        "n27",
        "n28"
      ],
      [
        "n28",
        "n29"
      ],
      [
        "n29",
        "n30"
      ],
      [
        "n30",
        "n31"
      ],
      [
        "n31",
        "n32"
      ],
      [
        "n32",
        "n33"
      ],
      [
        "n33",
        "n34"
      ],
      [
        "n34",
        "n35"
      ],
      [
        "n35",
        "n36"
      ],
      [
        "n36",
        "n37"
      ]
    ]
  },
  {
    "id": "weekly-pulse",
    "title": "Weekly client pulse",
    "caption": "Every Monday it reads each client channel, has Claude review the week, and posts one digest with the clients at risk first.",
    "nodes": [
      {
        "id": "n0",
        "name": "Every Monday 07:00",
        "kind": "trigger",
        "col": 0,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n1",
        "name": "Config & Week",
        "kind": "code",
        "col": 1,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n2",
        "name": "Channel Map",
        "kind": "code",
        "col": 2,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n3",
        "name": "Get Clients (ClickUp)",
        "kind": "http",
        "col": 3,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n4",
        "name": "List Slack Channels",
        "kind": "http",
        "col": 4,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n5",
        "name": "List Slack Users",
        "kind": "http",
        "col": 5,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n6",
        "name": "Build Client List",
        "kind": "code",
        "col": 6,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n7",
        "name": "One Item per Channel",
        "kind": "code",
        "col": 7,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n8",
        "name": "Get Channel History",
        "kind": "http",
        "col": 8,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n9",
        "name": "Threads to Fetch",
        "kind": "code",
        "col": 9,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n10",
        "name": "Get Thread Replies",
        "kind": "http",
        "col": 10,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n11",
        "name": "Prepare Clients",
        "kind": "code",
        "col": 11,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n12",
        "name": "Claude: Review Week",
        "kind": "ai",
        "col": 12,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n13",
        "name": "Build Digest",
        "kind": "code",
        "col": 13,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n14",
        "name": "Post Digest",
        "kind": "http",
        "col": 14,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n15",
        "name": "Check Digest Posted",
        "kind": "code",
        "col": 15,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n16",
        "name": "Post Thread Details",
        "kind": "http",
        "col": 16,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n17",
        "name": "Check Thread Posts",
        "kind": "code",
        "col": 17,
        "lane": 0,
        "skip": false
      }
    ],
    "edges": [
      [
        "n0",
        "n1"
      ],
      [
        "n1",
        "n2"
      ],
      [
        "n2",
        "n3"
      ],
      [
        "n3",
        "n4"
      ],
      [
        "n4",
        "n5"
      ],
      [
        "n5",
        "n6"
      ],
      [
        "n6",
        "n7"
      ],
      [
        "n7",
        "n8"
      ],
      [
        "n8",
        "n9"
      ],
      [
        "n9",
        "n10"
      ],
      [
        "n10",
        "n11"
      ],
      [
        "n11",
        "n12"
      ],
      [
        "n12",
        "n13"
      ],
      [
        "n13",
        "n14"
      ],
      [
        "n14",
        "n15"
      ],
      [
        "n15",
        "n16"
      ],
      [
        "n16",
        "n17"
      ]
    ]
  },
  {
    "id": "spend-roas",
    "title": "Daily spend, ROAS and fee",
    "caption": "Google Ads spend through the manager account, converted to EUR at ECB rates and written into ClickUp. Problems go to the ops channel.",
    "nodes": [
      {
        "id": "n0",
        "name": "Every Day 07:00",
        "kind": "trigger",
        "col": 0,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n1",
        "name": "Run Now Form",
        "kind": "trigger",
        "col": 0,
        "lane": 1,
        "skip": true
      },
      {
        "id": "n2",
        "name": "Config",
        "kind": "code",
        "col": 1,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n3",
        "name": "Get Stores",
        "kind": "http",
        "col": 2,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n4",
        "name": "Get Clients",
        "kind": "http",
        "col": 3,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n5",
        "name": "Get Shopify Days",
        "kind": "http",
        "col": 4,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n6",
        "name": "Plan Accounts",
        "kind": "code",
        "col": 5,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n7",
        "name": "Get Campaign Spend",
        "kind": "ads",
        "col": 6,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n8",
        "name": "Calculate",
        "kind": "code",
        "col": 7,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n9",
        "name": "Write?",
        "kind": "if",
        "col": 8,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n10",
        "name": "One Item per Field",
        "kind": "code",
        "col": 9,
        "lane": -1,
        "skip": false
      },
      {
        "id": "n11",
        "name": "Write Field",
        "kind": "http",
        "col": 10,
        "lane": -1,
        "skip": false
      },
      {
        "id": "n12",
        "name": "Count Writes",
        "kind": "code",
        "col": 11,
        "lane": -1,
        "skip": false
      },
      {
        "id": "n13",
        "name": "Report",
        "kind": "code",
        "col": 12,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n14",
        "name": "Post Problems?",
        "kind": "if",
        "col": 13,
        "lane": 0,
        "skip": false
      },
      {
        "id": "n15",
        "name": "Post to #ops",
        "kind": "http",
        "col": 14,
        "lane": -1,
        "skip": false
      },
      {
        "id": "n16",
        "name": "From the Form?",
        "kind": "if",
        "col": 14,
        "lane": 1,
        "skip": true
      },
      {
        "id": "n17",
        "name": "Result Page",
        "kind": "form",
        "col": 15,
        "lane": 1,
        "skip": true
      }
    ],
    "edges": [
      [
        "n0",
        "n2"
      ],
      [
        "n1",
        "n2"
      ],
      [
        "n2",
        "n3"
      ],
      [
        "n3",
        "n4"
      ],
      [
        "n4",
        "n5"
      ],
      [
        "n5",
        "n6"
      ],
      [
        "n6",
        "n7"
      ],
      [
        "n7",
        "n8"
      ],
      [
        "n8",
        "n9"
      ],
      [
        "n9",
        "n10"
      ],
      [
        "n9",
        "n13"
      ],
      [
        "n10",
        "n11"
      ],
      [
        "n11",
        "n12"
      ],
      [
        "n12",
        "n13"
      ],
      [
        "n13",
        "n14"
      ],
      [
        "n14",
        "n15"
      ],
      [
        "n14",
        "n16"
      ],
      [
        "n15",
        "n16"
      ],
      [
        "n16",
        "n17"
      ]
    ]
  }
];

export function getWorkflow(id: string) {
  return workflows.find((w) => w.id === id);
}
