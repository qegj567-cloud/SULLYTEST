
export enum AppID {
  Launcher = 'launcher',
  Settings = 'settings',
  Character = 'character',
  Chat = 'chat',
  GroupChat = 'group_chat', // New
  Gallery = 'gallery',
  Music = 'music',
  Browser = 'browser',
  ThemeMaker = 'thememaker',
  Appearance = 'appearance',
  Date = 'date',
  User = 'user',
  Journal = 'journal',
  Schedule = 'schedule',
  Room = 'room',
}

export interface AppConfig {
  id: AppID;
  name: string;
  icon: string;
  color: string;
}

export interface OSTheme {
  hue: number;
  saturation: number;
  lightness: number;
  wallpaper: string;
  darkMode: boolean;
  contentColor?: string;
}

export interface VirtualTime {
  hours: number;
  minutes: number;
  day: string;
}

export interface APIConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

export interface ApiPreset {
  id: string;
  name: string;
  config: APIConfig;
}

export interface MemoryFragment {
  id: string;
  date: string;
  summary: string;
  mood?: string;
}

export interface SpriteConfig {
  scale: number;
  x: number;
  y: number;
}

export interface RoomItem {
    id: string;
    name: string;
    type: 'furniture' | 'decor';
    image: string;
    x: number;
    y: number;
    scale: number;
    rotation: number;
    isInteractive: boolean;
    descriptionPrompt?: string;
}

export interface RoomTodo {
    id: string;
    charId: string;
    date: string;
    items: { text: string; done: boolean }[];
    generatedAt: number;
}

export interface RoomNote {
    id: string;
    charId: string;
    timestamp: number;
    content: string;
    type: 'lyric' | 'doodle' | 'thought' | 'search' | 'gossip';
}

export interface RoomGeneratedState {
    actorStatus: string;
    welcomeMessage: string;
    items: Record<string, { description: string; reaction: string }>;
    actorAction?: string; // e.g. 'idle', 'sleep'
}

export interface UserImpression {
    version: number;
    lastUpdated?: number;
    value_map: {
        likes: string[];
        dislikes: string[];
        core_values: string;
    };
    behavior_profile: {
        tone_style: string;
        emotion_summary: string;
        response_patterns: string;
    };
    emotion_schema: {
        triggers: {
            positive: string[];
            negative: string[];
        };
        comfort_zone: string;
        stress_signals: string[];
    };
    personality_core: {
        observed_traits: string[];
        interaction_style: string;
        summary: string;
    };
    mbti_analysis?: {
        type: string; // e.g. "INFP"
        reasoning: string;
        dimensions: {
            e_i: number; // 0 (E) - 100 (I)
            s_n: number; // 0 (S) - 100 (N)
            t_f: number; // 0 (T) - 100 (F)
            j_p: number; // 0 (J) - 100 (P)
        }
    };
    observed_changes?: string[];
}

export interface BubbleStyle {
    textColor: string;
    backgroundColor: string;
    backgroundImage?: string;
    backgroundImageOpacity?: number;
    borderRadius: number;
    opacity: number;
    
    decoration?: string;
    decorationX?: number;
    decorationY?: number;
    decorationScale?: number;
    decorationRotate?: number;

    avatarDecoration?: string;
    avatarDecorationX?: number;
    avatarDecorationY?: number;
    avatarDecorationScale?: number;
    avatarDecorationRotate?: number;
}

export interface ChatTheme {
    id: string;
    name: string;
    type: 'preset' | 'custom';
    user: BubbleStyle;
    ai: BubbleStyle;
    customCss?: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  avatar: string;
  description: string;
  systemPrompt: string;
  worldview?: string;
  memories: MemoryFragment[];
  refinedMemories?: Record<string, string>;
  activeMemoryMonths?: string[];
  
  impression?: UserImpression;

  bubbleStyle?: string;
  chatBackground?: string;
  contextLimit?: number;
  
  dateBackground?: string;
  sprites?: Record<string, string>;
  spriteConfig?: SpriteConfig;
  
  roomConfig?: {
      bgImage?: string;
      wallImage?: string;
      floorImage?: string;
      items: RoomItem[];
      // New Configs for Room Customization
      wallScale?: number; // 0 = Cover/Default, >0 = percentage
      wallRepeat?: boolean; 
      floorScale?: number;
      floorRepeat?: boolean;
  };
  
  lastRoomDate?: string;
  savedRoomState?: RoomGeneratedState;
}

// New Interface for Groups
export interface GroupProfile {
    id: string;
    name: string;
    members: string[]; // List of charIds
    avatar?: string; // Optional group avatar
    createdAt: number;
}

export interface CharacterExportData extends Omit<CharacterProfile, 'id' | 'memories' | 'refinedMemories' | 'activeMemoryMonths' | 'impression'> {
    version: number;
    type: 'sully_character_card';
    embeddedTheme?: ChatTheme;
}

export interface UserProfile {
    name: string;
    avatar: string;
    bio: string;
}

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

export interface GalleryImage {
    id: string;
    charId: string;
    url: string;
    timestamp: number;
    review?: string;
    reviewTimestamp?: number;
}

export interface StickerData {
    id: string;
    url: string;
    x: number;
    y: number;
    rotation: number;
    scale?: number; // Added scale property
}

export interface DiaryPage {
    text: string;
    paperStyle: string;
    stickers: StickerData[];
}

export interface DiaryEntry {
    id: string;
    charId: string;
    date: string;
    userPage: DiaryPage;
    charPage?: DiaryPage;
    timestamp: number;
    isArchived: boolean;
}

export interface Task {
    id: string;
    title: string;
    supervisorId: string;
    tone: 'gentle' | 'strict' | 'tsundere';
    deadline?: string;
    isCompleted: boolean;
    completedAt?: number;
    createdAt: number;
}

export interface Anniversary {
    id: string;
    title: string;
    date: string;
    charId: string;
    aiThought?: string;
    lastThoughtGeneratedAt?: number;
}

export type MessageType = 'text' | 'image' | 'emoji' | 'interaction' | 'transfer' | 'system';

export interface Message {
    id: number;
    charId: string; // If in group, this is the sender ID. For system messages in group, use 'system'.
    groupId?: string; // New: If present, message belongs to a group
    role: 'user' | 'assistant' | 'system';
    type: MessageType;
    content: string;
    timestamp: number;
    metadata?: any;
}

export interface FullBackupData {
    timestamp: number;
    version: number;
    theme?: OSTheme;
    apiConfig?: APIConfig;
    apiPresets?: ApiPreset[];
    availableModels?: string[];
    customIcons?: Record<string, string>;
    characters?: CharacterProfile[];
    groups?: GroupProfile[]; // New
    messages?: Message[];
    customThemes?: ChatTheme[];
    savedEmojis?: {name: string, url: string}[];
    savedJournalStickers?: {name: string, url: string}[]; // New backup field
    assets?: { id: string, data: string }[];
    galleryImages?: GalleryImage[];
    userProfile?: UserProfile;
    diaries?: DiaryEntry[];
    tasks?: Task[];
    anniversaries?: Anniversary[];
    roomTodos?: RoomTodo[]; 
    roomNotes?: RoomNote[]; 
    
    mediaAssets?: {
        charId: string;
        sprites?: Record<string, string>;
        roomItems?: Record<string, string>; 
        backgrounds?: { chat?: string; date?: string; roomWall?: string; roomFloor?: string };
    }[];
}
