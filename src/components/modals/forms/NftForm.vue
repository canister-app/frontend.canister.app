<template>
    <div class="pl-10 pb-3">
        <div class="row gy-4">
            <input type="hidden" name="token_standard" value="EXT-NFT">
            <div class="col-sm-12">
                <div class="form-group">
                    <label class="form-label">Collection Name</label>
                    <div class="form-control-wrap">
                        <input type="text" class="form-control" name="collection_name" placeholder="Ex: Canic NFT Card" required>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="form-group">
                    <label class="form-label">Royalty Address (Account ID)</label>
                    <div class="form-control-wrap">
                        <input type="text" class="form-control" name="royalty_address" placeholder="Account ID, which receive royalty fees" required>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="form-label">Royalty Fee (percent %)</label>
                    <div class="form-control-wrap">
                        <input type="number" class="form-control" placeholder="3" name="royalty_fee">
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <label class="form-label">Collection Owner (Principal)</label>
                    <div class="form-control-wrap">
                        <input type="text" class="form-control" name="collection_owner" placeholder="" required>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>