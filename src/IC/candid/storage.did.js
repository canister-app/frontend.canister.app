export default ({ IDL }) => {
    const FileInit = IDL.Record({
        'name' : IDL.Text,
        'path' : IDL.Text,
        'mimeType' : IDL.Text,
        'fileSize' : IDL.Nat,
        'chunkCount' : IDL.Nat,
    });
    const FileId = IDL.Text;
    const ChunkData = IDL.Vec(IDL.Nat8);
    const UserId = IDL.Principal;
    const FileId__1 = IDL.Text;
    const FileInfo = IDL.Record({
        'userId' : UserId,
        'name' : IDL.Text,
        'createdAt' : IDL.Int,
        'mimeType' : IDL.Text,
        'fileSize' : IDL.Nat,
        'fileId' : FileId__1,
        'chunkCount' : IDL.Nat,
    });
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
    return IDL.Service({
        'createFile' : IDL.Func([FileInit], [IDL.Opt(FileId)], []),
        'getAdmins' : IDL.Func([], [IDL.Vec(IDL.Principal)], []),
        'getFileChunk' : IDL.Func(
            [FileId, IDL.Nat],
            [IDL.Opt(ChunkData)],
            ['query'],
        ),
        'getFiles' : IDL.Func(
            [],
            [IDL.Opt(IDL.Vec(IDL.Tuple(FileId, FileInfo)))],
            ['query'],
        ),
        'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
        'putFileChunk' : IDL.Func([FileId, IDL.Nat, ChunkData], [], []),
        'removeFile' : IDL.Func([IDL.Text], [], []),
    });
};
export const init = ({ IDL }) => { return []; };