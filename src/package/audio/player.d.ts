export declare class Player {
    private static instance;
    static getInstance(): Player;
    private audioElement;
    private mediaStream;
    private constructor();
    setMute(mute: boolean): void;
    getMute(): boolean;
    setStream(stream: MediaStream): void;
    setTrack(track: MediaStreamTrack): void;
    playWorkaroundSound(): void;
}
