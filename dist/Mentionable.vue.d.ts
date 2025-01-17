import { PropType } from "vue";
export interface MentionItem {
    searchText?: string;
    label?: string;
    value: any;
}
declare const _default: import("vue").DefineComponent<{
    keys: {
        type: PropType<string[]>;
        required: true;
    };
    items: {
        type: PropType<MentionItem[]>;
        default: () => any[];
    };
    omitKey: {
        type: BooleanConstructor;
        default: boolean;
    };
    filteringDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    insertSpace: {
        type: BooleanConstructor;
        default: boolean;
    };
    mapInsert: {
        type: PropType<(item: MentionItem, key: string) => string>;
        default: any;
    };
    limit: {
        type: NumberConstructor;
        default: number;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    caretHeight: {
        type: NumberConstructor;
        default: number;
    };
}, {
    el: import("vue").Ref<HTMLDivElement>;
    currentKey: import("vue").Ref<string>;
    oldKey: import("vue").Ref<string>;
    caretPosition: import("vue").Ref<{
        top: number;
        left: number;
        height: number;
    }>;
    displayedItems: import("vue").ComputedRef<MentionItem[]>;
    selectedIndex: import("vue").Ref<number>;
    applyMention: (itemIndex: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("open" | "close" | "search" | "apply")[], "search" | "open" | "close" | "apply", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    keys: {
        type: PropType<string[]>;
        required: true;
    };
    items: {
        type: PropType<MentionItem[]>;
        default: () => any[];
    };
    omitKey: {
        type: BooleanConstructor;
        default: boolean;
    };
    filteringDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    insertSpace: {
        type: BooleanConstructor;
        default: boolean;
    };
    mapInsert: {
        type: PropType<(item: MentionItem, key: string) => string>;
        default: any;
    };
    limit: {
        type: NumberConstructor;
        default: number;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    caretHeight: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    onOpen?: (...args: any[]) => any;
    onClose?: (...args: any[]) => any;
    onSearch?: (...args: any[]) => any;
    onApply?: (...args: any[]) => any;
}, {
    theme: string;
    items: MentionItem[];
    omitKey: boolean;
    filteringDisabled: boolean;
    insertSpace: boolean;
    mapInsert: (item: MentionItem, key: string) => string;
    limit: number;
    caretHeight: number;
}>;
export default _default;
