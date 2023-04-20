export const idlFactory = ({ IDL }) => {
    const FileInit = IDL.Record({
        'name' : IDL.Text,
        'path' : IDL.Text,
        'mimeType' : IDL.Text,
        'fileSize' : IDL.Nat,
        'chunkCount' : IDL.Nat,
        'parent' : IDL.Text,
    });
    const UserId = IDL.Principal;
    const FileId = IDL.Text;
    const ChunkData = IDL.Vec(IDL.Nat8);
    const UserId__1 = IDL.Principal;
    const FileId__1 = IDL.Text;
    const FileInfo = IDL.Record({
        'userId' : UserId__1,
        'name' : IDL.Text,
        'createdAt' : IDL.Int,
        'isFolder' : IDL.Bool,
        'mimeType' : IDL.Text,
        'fileSize' : IDL.Nat,
        'fileId' : FileId__1,
        'chunkCount' : IDL.Nat,
        'parent' : IDL.Text,
    });
    const Setting = IDL.Record({ 'domain' : IDL.Text, 'isPublic' : IDL.Bool });
    const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
    const HttpRequest = IDL.Record({
        'url' : IDL.Text,
        'method' : IDL.Text,
        'body' : IDL.Vec(IDL.Nat8),
        'headers' : IDL.Vec(HeaderField),
    });
    const StreamingCallbackToken = IDL.Record({
        'key' : IDL.Text,
        'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
        'index' : IDL.Nat,
        'content_encoding' : IDL.Text,
    });
    const StreamingStrategy = IDL.Variant({
        'Callback' : IDL.Record({
            'token' : StreamingCallbackToken,
            'callback' : IDL.Func([], [], []),
        }),
    });
    const HttpResponse = IDL.Record({
        'body' : IDL.Vec(IDL.Nat8),
        'headers' : IDL.Vec(HeaderField),
        'streaming_strategy' : IDL.Opt(StreamingStrategy),
        'status_code' : IDL.Nat16,
    });
    const StreamingCallbackHttpResponse = IDL.Record({
        'token' : IDL.Opt(StreamingCallbackToken),
        'body' : IDL.Vec(IDL.Nat8),
    });
    const CanicActor = IDL.Service({
        'createFile' : IDL.Func([FileInit, UserId], [IDL.Opt(FileId)], []),
        'createFolder' : IDL.Func([IDL.Text], [], []),
        'deleteAsset' : IDL.Func([IDL.Text], [], []),
        'emptyFiles' : IDL.Func([], [], []),
        'generateUUID' : IDL.Func([], [IDL.Text], []),
        'getFileChunk' : IDL.Func(
            [FileId, IDL.Nat],
            [IDL.Opt(ChunkData)],
            ['query'],
        ),
        'getFiles' : IDL.Func([], [IDL.Opt(IDL.Vec(FileInfo))], ['query']),
        'getFolder' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Vec(FileInfo))], ['query']),
        'getMemory' : IDL.Func([], [IDL.Nat], ['query']),
        'getSettings' : IDL.Func(
            [],
            [IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, Setting)))],
            ['query'],
        ),
        'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
        'http_request_streaming_callback' : IDL.Func(
            [StreamingCallbackToken],
            [StreamingCallbackHttpResponse],
            ['query'],
        ),
        'putFileChunk' : IDL.Func([FileId, IDL.Nat, ChunkData, UserId], [], []),
        'removeFile' : IDL.Func([IDL.Text], [], []),
        'updateSetting' : IDL.Func([IDL.Text, IDL.Bool], [IDL.Bool], []),
    });
    return CanicActor;
};
export const init = ({ IDL }) => { return []; };
