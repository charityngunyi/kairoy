// Import the Profile interface
import { Profile, Content } from './kairoy.interface';

export const profileCreationProtocol = {
  "protocol": "http://author-can-protocol.xyz",
  "published": true,
  "types": {
    "userProfile": {
      "schema": Profile, // Reference the Profile interface
    },
    "content":{}
  },
  "structure": {
    "userProfile": {
      "$actions": [
        {
          "who": "anyone",
          "can": "create"
        },
        {
          "who": "anyone",
          "can": "read"
        },
        {
          "who": "author",
          "of": "userProfile",
          "can": "update"
        },
        {
          "who": "author",
          "of": "userProfile",
          "can": "delete"
        }
      ]
    }
  }
};

// for content creation
export const contentCreationProtocol = {
  "protocol": "http://author-can-protocol.xyz",
  "published": true,
  "types": {
    "article": {
      "schema": Content,
    },
    "picture": {
      "schema": Content,
    },
    "video": {
      "schema": Content,
    },
    "music": {
      "schema": Content,
    },
    "art": {
      "schema": Content,
    },
    "culture": {
      "schema": Content,
    },
    "shortstory": {
      "schema": Content,
    },
  },
  "structure": {
    "article": {
      "$actions": [
        {
          "who": "user",
          "can": "create"
        },
        {
          "who": "anyone",
          "can": "read"
        },
        {
          "who": "author",
          "of": "article",
          "can": "update"
        },
        {
          "who": "author",
          "of": "article",
          "can": "delete"
        }
      ]
    },
    "picture": {
      "$actions": [
        {
          "who": "user",
          "can": "create"
        },
        {
          "who": "anyone",
          "can": "read"
        },
        {
          "who": "author",
          "of": "picture",
          "can": "update"
        },
        {
          "who": "author",
          "of": "picture",
          "can": "delete"
        }
      ]
    },
    "video": {
      "$actions": [
        {
          "who": "user",
          "can": "create"
        },
        {
          "who": "anyone",
          "can": "read"
        },
        {
          "who": "author",
          "of": "video",
          "can": "update"
        },
        {
          "who": "author",
          "of": "video",
          "can": "delete"
        }
      ]
    },
    "music": {
      "$actions": [
        {
          "who": "user",
          "can": "create"
        },
        {
          "who": "anyone",
          "can": "read"
        },
        {
          "who": "author",
          "of": "music",
          "can": "update"
        },
        {
          "who": "author",
          "of": "music",
          "can": "delete"
        }
      ]
    },
    "art": {
      "$actions": [
        {
          "who": "user",
          "can": "create"
        },
        {
          "who": "anyone",
          "can": "read"
        },
        {
          "who": "author",
          "of": "art",
          "can": "update"
        },
        {
          "who": "author",
          "of": "art",
          "can": "delete"
        }
      ]
    },
    "culture": {
      "$actions": [
        {
          "who": "user",
          "can": "create"
        },
        {
          "who": "anyone",
          "can": "read"
        },
        {
          "who": "author",
          "of": "culture",
          "can": "update"
        },
        {
          "who": "author",
          "of": "culture",
          "can": "delete"
        }
      ]
    },
    "shortstory": {
      "$actions": [
        {
          "who": "user",
          "can": "create"
        },
        {
          "who": "anyone",
          "can": "read"
        },
        {
          "who": "author",
          "of": "shortstory",
          "can": "update"
        },
        {
          "who": "author",
          "of": "shortstory",
          "can": "delete"
        }
      ]
    }
  }
};
